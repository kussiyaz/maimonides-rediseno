document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarClose = document.getElementById('sidebarClose');

    function openSidebar() {
        if (sidebar) {
            sidebar.classList.add('open');
        }
        if (sidebarOverlay) {
            sidebarOverlay.classList.add('open');
        }
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        if (sidebar) {
            sidebar.classList.remove('open');
        }
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove('open');
        }
        document.body.style.overflow = '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', openSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }

    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.history.back();
        });
    }

    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationDropdown.classList.toggle('open');
        });
        
        document.addEventListener('click', function(e) {
            if (!notificationDropdown.contains(e.target) && e.target !== notificationBtn) {
                notificationDropdown.classList.remove('open');
            }
        });
        
        const notificationItems = notificationDropdown.querySelectorAll('.notification-item');
        notificationItems.forEach(item => {
            item.addEventListener('click', function() {
                this.classList.remove('unread');
                notificationDropdown.classList.remove('open');
            });
        });
    }

    const currentMonthEl = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const calendarGrid = document.getElementById('calendarGrid');
    const dayDetailsOverlay = document.getElementById('dayDetailsOverlay');
    const dayDetailsTitle = document.getElementById('dayDetailsTitle');
    const dayDetailsClose = document.getElementById('dayDetailsClose');
    const dayEventsList = document.getElementById('dayEventsList');
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    let currentDate = new Date();
    
    function markPersonalEventsOnCalendar() {
        const calendarGrid = document.getElementById('calendarGrid');
        const currentMonthEl = document.getElementById('currentMonth');
        
        if (!calendarGrid || !currentMonthEl) return;
        
        const monthName = currentMonthEl.textContent.split(' ')[0];
        const year = currentMonthEl.textContent.split(' ')[1];
        const mesNum = meses.indexOf(monthName) + 1;
        
        const personalEvents = JSON.parse(localStorage.getItem('personalEvents') || '[]');
        
        calendarGrid.querySelectorAll('.calendar-day:not(.empty)').forEach(dayEl => {
            const day = dayEl.getAttribute('data-day');
            if (day) {
                const fechaFormateada = year + '-' + String(mesNum).padStart(2, '0') + '-' + String(day).padStart(2, '0');
                const hasPersonalEvent = personalEvents.some(e => e.date === fechaFormateada);
                
                if (hasPersonalEvent && !dayEl.classList.contains('event')) {
                    dayEl.classList.add('event', 'personal');
                }
            }
        });
    }
    
    if (currentMonthEl && prevMonthBtn && nextMonthBtn) {
        
        function updateCalendar() {
            const mes = meses[currentDate.getMonth()];
            const anio = currentDate.getFullYear();
            currentMonthEl.textContent = mes + ' ' + anio;
            markPersonalEventsOnCalendar();
        }
        
        prevMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            updateCalendar();
        });
        
        nextMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            updateCalendar();
        });
        
        if (calendarGrid && dayDetailsOverlay && dayDetailsTitle && dayEventsList) {
            
            function openDayDetails(dayEl) {
                const day = dayEl.getAttribute('data-day');
                const eventsData = dayEl.getAttribute('data-events');
                let events = [];
                
                try {
                    events = JSON.parse(eventsData);
                } catch (e) {
                    events = [];
                }
                
                const monthName = currentMonthEl.textContent.split(' ')[0];
                const year = currentMonthEl.textContent.split(' ')[1];
                
                const mesNum = meses.indexOf(monthName) + 1;
                const fechaFormateada = year + '-' + String(mesNum).padStart(2, '0') + '-' + String(day).padStart(2, '0');
                
                const personalEvents = JSON.parse(localStorage.getItem('personalEvents') || '[]');
                const personalEventsForDay = personalEvents.filter(e => e.date === fechaFormateada);
                
                personalEventsForDay.forEach(personalEvent => {
                    const colorMap = {
                        'blue': 'var(--color-accent)',
                        'green': 'var(--color-success)',
                        'orange': 'var(--color-warning)',
                        'purple': '#8B5CF6',
                        'red': 'var(--color-error)'
                    };
                    
                    events.push({
                        type: 'personal',
                        title: 'Personal',
                        materia: personalEvent.title,
                        detail: personalEvent.detail || '',
                        color: colorMap[personalEvent.color] || 'var(--color-accent)'
                    });
                });
                
                dayDetailsTitle.textContent = day + ' de ' + monthName + ' ' + year;
                
                if (events.length === 0) {
                    dayEventsList.innerHTML = '<div class="no-events">No hay eventos para este día</div>';
                } else {
                    dayEventsList.innerHTML = events.map(event => {
                        const iconColor = event.color || (event.type === 'exam' ? 'var(--color-error)' : 'var(--color-accent)');
                        return `
                        <div class="day-event-item">
                            <div class="day-event-icon" style="background: ${iconColor}20; color: ${iconColor}">
                                ${event.type === 'exam' 
                                    ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>'
                                    : event.type === 'personal'
                                    ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
                                    : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'}
                            </div>
                            <div class="day-event-info">
                                <div class="day-event-type">${event.title}</div>
                                <div class="day-event-title">${event.materia}</div>
                                <div class="day-event-detail">${event.detail}</div>
                            </div>
                        </div>
                    `}).join('');
                }
                
                dayDetailsOverlay.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
            
            function closeDayDetails() {
                dayDetailsOverlay.classList.remove('open');
                document.body.style.overflow = '';
            }
            
            calendarGrid.querySelectorAll('.calendar-day:not(.empty)').forEach(dayEl => {
                dayEl.addEventListener('click', function() {
                    openDayDetails(this);
                });
            });
            
            if (dayDetailsClose) {
                dayDetailsClose.addEventListener('click', closeDayDetails);
            }
            
            dayDetailsOverlay.addEventListener('click', function(e) {
                if (e.target === dayDetailsOverlay) {
                    closeDayDetails();
                }
            });
        }
    }

    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const cursandoSection = document.getElementById('cursando-section');
            const aprobadasSection = document.getElementById('aprobadas-section');
            const pendientesSection = document.getElementById('pendientes-section');
            
            if (cursandoSection) cursandoSection.style.display = 'none';
            if (aprobadasSection) aprobadasSection.style.display = 'none';
            if (pendientesSection) pendientesSection.style.display = 'none';
            
            if (filter === 'cursando' && cursandoSection) {
                cursandoSection.style.display = 'block';
            } else if (filter === 'aprobadas' && aprobadasSection) {
                aprobadasSection.style.display = 'block';
            } else if (filter === 'pendientes' && pendientesSection) {
                pendientesSection.style.display = 'block';
            }
        });
    });

    const resourceTabs = document.querySelectorAll('.resource-tab');
    resourceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            resourceTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim().toLowerCase();
                if (query) {
                    if (query.includes('prog') || query.includes('programación') || query.includes('react')) {
                        window.location.href = 'materia.html';
                    } else if (query.includes('diseño')) {
                        window.location.href = 'materias.html';
                    } else if (query.includes('mensaje') || query.includes('chat')) {
                        window.location.href = 'mensajes.html';
                    } else if (query.includes('calendario') || query.includes('examen')) {
                        window.location.href = 'calendario.html';
                    } else if (query.includes('biblioteca') || query.includes('libro')) {
                        window.location.href = 'biblioteca.html';
                    } else {
                        alert('No se encontraron resultados para: ' + query);
                    }
                }
            }
        });
        
        input.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            if (query.length >= 3) {
                this.style.backgroundColor = 'var(--color-accent-light)';
            } else {
                this.style.backgroundColor = '';
            }
        });
    });

    const chatInputs = document.querySelectorAll('.chat-message-input');
    chatInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const message = this.value.trim();
                if (message) {
                    console.log('Enviando mensaje:', message);
                    this.value = '';
                }
            }
        });
    });

    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 100;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                closeSidebar();
            } else {
                if (!sidebar.classList.contains('open')) {
                    openSidebar();
                }
            }
        }
    }
});

function openMaterial(title, type) {
    const modal = document.getElementById('materialModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');
    
    if (modal && modalTitle && modalText) {
        const messages = {
            'PDF': 'Abriendo documento PDF...',
            'Video': 'Reproduciendo video...',
            'Práctica': 'Cargando ejercicios interactivos...',
            'Entrega': 'Abriendo formulario de entrega...',
            'Foro': 'Cargando tema del foro...'
        };
        
        modalTitle.textContent = title;
        modalText.textContent = messages[type] || 'Abriendo contenido...';
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeMaterialModal() {
    const modal = document.getElementById('materialModal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

document.addEventListener('click', function(e) {
    const modal = document.getElementById('materialModal');
    if (modal && modal.classList.contains('open') && e.target === modal) {
        closeMaterialModal();
    }
});

const todayClassSection = document.getElementById('todayClassSection');
if (todayClassSection) {
    const todayDateEl = document.getElementById('todayDate');
    const todayClassCard = document.getElementById('todayClassCard');
    const noClassCard = document.getElementById('noClassCard');
    const todayClassHour = document.getElementById('todayClassHour');
    const todayClassSchedule = document.getElementById('todayClassSchedule');
    const todayClassName = document.getElementById('todayClassName');
    const todayClassTeacher = document.getElementById('todayClassTeacher');
    const todayClassLocation = document.getElementById('todayClassLocation');
    const todayClassAssignment = document.getElementById('todayClassAssignment');
    const todayAssignmentTitle = document.getElementById('todayAssignmentTitle');
    const todayAssignmentDue = document.getElementById('todayAssignmentDue');
    
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    const hoy = new Date();
    const diaSemana = hoy.getDay();
    const numeroDia = hoy.getDate();
    const mes = meses[hoy.getMonth()];
    
    if (todayDateEl) {
        todayDateEl.textContent = numeroDia + ' de ' + mes;
    }
    
    const horarios = {
        1: { 
            name: 'Comunicación Social',
            teacher: 'Dr. Andrés Ruiz',
            location: 'Aula 302',
            hour: '08:30',
            schedule: 'Lun/Mié',
            hasAssignment: true,
            assignmentTitle: 'TP: Spot publicitario',
            assignmentDue: 'Vence mañana'
        },
        2: {
            name: 'Arte Digital I',
            teacher: 'Prof. Lucía Fernández',
            location: 'Lab. de Diseño',
            hour: '18:30',
            schedule: 'Mar/Jue',
            hasAssignment: false
        },
        3: {
            name: 'Programación Multimedial II',
            teacher: 'Mg. Damián Pereyra',
            location: 'Lab. de Computación 1',
            hour: '10:00',
            schedule: 'Lun/Mié',
            hasAssignment: true,
            assignmentTitle: 'TP Final: App de Notas',
            assignmentDue: '2 días'
        },
        4: {
            name: 'Producción Audiovisual',
            teacher: 'Lic. Marcos Torres',
            location: 'Lab. de Video',
            hour: '18:30',
            schedule: 'Mar/Jue',
            hasAssignment: true,
            assignmentTitle: 'Cortometraje Grupal',
            assignmentDue: '5 días'
        },
        5: {
            name: 'Diseño Aplicado',
            teacher: 'Lic. Carolina Sánchez',
            location: 'Aula 201',
            hour: '10:00',
            schedule: 'Vie',
            hasAssignment: false
        }
    };
    
    if (diaSemana === 0 || diaSemana === 6) {
        if (todayClassCard) todayClassCard.style.display = 'none';
        if (noClassCard) noClassCard.style.display = 'flex';
    } else if (horarios[diaSemana]) {
        const clase = horarios[diaSemana];
        if (todayClassCard) todayClassCard.style.display = 'block';
        if (noClassCard) noClassCard.style.display = 'none';
        
        if (todayClassHour) todayClassHour.textContent = clase.hour;
        if (todayClassSchedule) todayClassSchedule.textContent = clase.schedule;
        if (todayClassName) todayClassName.textContent = clase.name;
        if (todayClassTeacher) todayClassTeacher.textContent = clase.teacher;
        if (todayClassLocation) todayClassLocation.textContent = '📍 ' + clase.location;
        
        if (clase.hasAssignment && todayClassAssignment && todayAssignmentTitle && todayAssignmentDue) {
            todayClassAssignment.style.display = 'flex';
            todayAssignmentTitle.textContent = clase.assignmentTitle;
            todayAssignmentDue.textContent = clase.assignmentDue;
        } else if (todayClassAssignment) {
            todayClassAssignment.style.display = 'none';
        }
    } else {
        if (todayClassCard) todayClassCard.style.display = 'none';
        if (noClassCard) noClassCard.style.display = 'flex';
    }
}

const syncGoogleCalendarBtn = document.getElementById('syncGoogleCalendar');
const addPersonalEventBtn = document.getElementById('addPersonalEvent');
const addEventOverlay = document.getElementById('addEventOverlay');
const addEventClose = document.getElementById('addEventClose');
const cancelAddEventBtn = document.getElementById('cancelAddEvent');
const saveEventBtn = document.getElementById('saveEvent');

if (syncGoogleCalendarBtn) {
    syncGoogleCalendarBtn.addEventListener('click', function() {
        alert('Para sincronizar con Google Calendar:\n\n1. Ve a google.com/calendar\n2. Configuración → Importar y exportar\n3. Exporta tus eventos del Campus Virtual\n4. Importa el archivo a Google Calendar\n\nNota: Esta función requiere integración con Google Calendar API para funcionar automáticamente.');
    });
}

if (addPersonalEventBtn && addEventOverlay) {
    addPersonalEventBtn.addEventListener('click', function() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        
        const eventDateInput = document.getElementById('eventDate');
        if (eventDateInput) {
            eventDateInput.value = year + '-' + month + '-' + day;
        }
        
        addEventOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
}

function closeAddEventModal() {
    if (addEventOverlay) {
        addEventOverlay.classList.remove('open');
        document.body.style.overflow = '';
        
        const eventTitle = document.getElementById('eventTitle');
        const eventDate = document.getElementById('eventDate');
        const eventTime = document.getElementById('eventTime');
        const eventDescription = document.getElementById('eventDescription');
        
        if (eventTitle) eventTitle.value = '';
        if (eventDate) eventDate.value = '';
        if (eventTime) eventTime.value = '';
        if (eventDescription) eventDescription.value = '';
        
        document.querySelectorAll('.color-option').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.color-option.color-blue').classList.add('active');
    }
}

if (addEventClose) {
    addEventClose.addEventListener('click', closeAddEventModal);
}

if (cancelAddEventBtn) {
    cancelAddEventBtn.addEventListener('click', closeAddEventModal);
}

if (addEventOverlay) {
    addEventOverlay.addEventListener('click', function(e) {
        if (e.target === addEventOverlay) {
            closeAddEventModal();
        }
    });
}

document.querySelectorAll('.color-option').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.color-option').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

if (saveEventBtn) {
    saveEventBtn.addEventListener('click', function() {
        const eventTitle = document.getElementById('eventTitle').value.trim();
        const eventDate = document.getElementById('eventDate').value;
        const eventTime = document.getElementById('eventTime').value;
        const eventDescription = document.getElementById('eventDescription').value.trim();
        const selectedColor = document.querySelector('.color-option.active').getAttribute('data-color');
        
        if (!eventTitle) {
            alert('Por favor, ingresa un título para el evento');
            return;
        }
        
        if (!eventDate) {
            alert('Por favor, selecciona una fecha');
            return;
        }
        
        const evento = {
            title: eventTitle,
            date: eventDate,
            time: eventTime || '00:00',
            description: eventDescription,
            type: 'personal',
            color: selectedColor,
            detail: eventTime ? 'Hora: ' + eventTime : ''
        };
        
        let personalEvents = JSON.parse(localStorage.getItem('personalEvents') || '[]');
        personalEvents.push(evento);
        localStorage.setItem('personalEvents', JSON.stringify(personalEvents));
        
        closeAddEventModal();
        
        if (typeof markPersonalEventsOnCalendar === 'function') {
            markPersonalEventsOnCalendar();
        }
        
        alert('Evento guardado correctamente:\n\n' + eventTitle + '\nFecha: ' + eventDate + (eventTime ? ' - ' + eventTime : ''));
    });
}

function openChat(name, subject, avatarUrl) {
    const chatView = document.getElementById('chatView');
    const messagesList = document.querySelector('.messages-list');
    const chatAvatar = document.getElementById('chatAvatar');
    const chatName = document.getElementById('chatName');
    const chatStatus = document.getElementById('chatStatus');
    
    if (chatView && chatAvatar && chatName && chatStatus) {
        chatAvatar.src = avatarUrl;
        chatName.textContent = name;
        chatStatus.textContent = subject;
        
        chatView.classList.add('active');
        if (messagesList) {
            messagesList.classList.add('hidden');
        }
        
        document.body.style.overflow = 'hidden';
        
        document.querySelectorAll('.conversation-item').forEach(item => {
            const contactName = item.querySelector('.conversation-name');
            if (contactName && contactName.textContent.includes(name.split(' ').pop())) {
                item.classList.remove('conversation-unread');
                const badge = item.querySelector('.unread-badge');
                if (badge) {
                    badge.style.display = 'none';
                }
            }
        });
    }
}

function closeChat() {
    const chatView = document.getElementById('chatView');
    const messagesList = document.querySelector('.messages-list');
    
    if (chatView) {
        chatView.classList.remove('active');
    }
    if (messagesList) {
        messagesList.classList.remove('hidden');
    }
    document.body.style.overflow = '';
}
