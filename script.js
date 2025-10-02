// Navigation functionality
function showPage(pageId, event) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => page.classList.add('hidden'));
    
    // Show selected page
    document.getElementById(pageId).classList.remove('hidden');
    
    // Update navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    const mobileNavButtons = document.querySelectorAll('.mobile-nav-btn');
    
    navButtons.forEach(btn => {
        btn.classList.remove('text-ethnos-blue', 'bg-blue-50');
        btn.classList.add('text-ethnos-gray');
    });
    
    mobileNavButtons.forEach(btn => {
        btn.classList.remove('text-ethnos-blue', 'bg-blue-50');
        btn.classList.add('text-ethnos-gray');
    });
    
    // Highlight active button
    if (event) {
        event.target.classList.remove('text-ethnos-gray');
        event.target.classList.add('text-ethnos-blue', 'bg-blue-50');
    }
    
    // Close mobile menu
    document.getElementById('mobile-menu').classList.add('hidden');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Proposal toggle functionality
function toggleProposal(proposalId) {
    const proposal = document.getElementById(proposalId);
    const icon = document.getElementById(proposalId + '-icon');
    
    if (proposal.classList.contains('hidden')) {
        proposal.classList.remove('hidden');
        icon.textContent = '-';
    } else {
        proposal.classList.add('hidden');
        icon.textContent = '+';
    }
}

// Calendar functionality
let currentDate = new Date();
const events = {
    // Enero
'2026-01-01': { type: 'holiday', title: 'Año Nuevo', description: '¡Feliz Año nuevo a toda la comunidad claretiana!' },
'2026-01-04': { type: 'birthday', title: 'Cumpleaños', description: '🎂 Guadalupe Vaccaro' },
'2026-01-10': { type: 'birthday', title: 'Cumpleaños', description: '🎂 Tomás Bordenave' },
'2026-01-24': { type: 'birthday', title: 'Cumpleaños', description: '🎂 Lourdes Ragazzini' },

// Febrero
'2026-02-16': { type: 'holiday', title: 'Carnaval', description: 'Feriado nacional - Carnaval' },
'2026-02-17': { type: 'holiday', title: 'Carnaval', description: 'Feriado nacional - Carnaval' },

// Marzo
'2026-03-24': { type: 'holiday', title: 'Día de la Memoria', description: 'Día Nacional de la Memoria por la Verdad y la Justicia' },
'2026-03-25': { type: 'birthday', title: 'Cumpleaños', description: '🎂 Lucía Areco' },

// Abril
'2026-04-01': { type: 'birthday', title: 'Cumpleaños', description: '🎂 Julián Leal (6to E&C)' },
'2026-04-02': { type: 'holiday', title: 'Malvinas', description: 'Día del Veterano y de los Caídos en la Guerra de Malvinas' },
'2026-04-03': { type: 'holiday', title: 'Viernes Santo', description: 'Conmemoración religiosa' },
'2026-04-25': { type: 'birthday', title: 'Cumpleaños', description: '🎂 Jazmín Begue' },
'2026-04-28': { type: 'birthday', title: 'Cumpleaños', description: '🎂 Ana Heredia' },

// Mayo
'2026-05-01': { type: 'holiday', title: 'Día del Trabajador', description: 'Feriado nacional' },
'2026-05-25': { type: 'holiday', title: 'Revolución de Mayo', description: 'Día de la Patria' },

// Junio
'2026-06-11': { type: 'event', title: 'Inicio del Mundial 2026', description: '¡Vamos todos a apoyar el mundial 2026!' },
'2026-06-16': { type: 'birthday', title: 'Cumpleaños', description: '🎂 Isabella Anthonioz' },
'2026-06-17': { type: 'holiday', title: 'Gral. Güemes', description: 'Paso a la Inmortalidad del General Martín Miguel de Güemes' },
'2026-06-20': { type: 'holiday', title: 'Belgrano', description: 'Paso a la Inmortalidad del Gral. Manuel Belgrano' },

// Julio
'2026-07-09': { type: 'holiday', title: 'Independencia', description: 'Día de la Independencia Argentina' },

// Agosto
'2026-08-17': { type: 'holiday', title: 'San Martín', description: 'Paso a la Inmortalidad del Gral. José de San Martín' },

// Septiembre
'2026-09-12': { type: 'birthday', title: 'Cumpleaños', description: '🎂 Leticia Bee Sellares' },
'2026-09-23': { type: 'birthday', title: 'Cumpleaños', description: '🎂 Cande Griffo' },

// Octubre 2025 (del calendario subido)
'2025-10-03': { type: 'birthday', title: 'Cumpleaños', description: '🎂 Feli Potkova' },
'2025-10-02': { type: 'holiday', title: 'Día del Perdón', description: 'Conmemoración religiosa' },
'2025-10-10': { type: 'holiday', title: 'Día de la Raza', description: 'Traslado del 12/10 - Diversidad Cultural' },

// Octubre 2026 (general + cumple)
'2026-10-03': { type: 'birthday', title: 'Cumpleaños', description: '🎂 Feli Potkova' },
'2026-10-12': { type: 'holiday', title: 'Diversidad Cultural', description: 'Día del Respeto a la Diversidad Cultural' },

// Noviembre 2025
'2025-11-21': { type: 'holiday', title: 'Feriado turístico', description: 'Día no laborable con fines turísticos' },
'2025-11-24': { type: 'holiday', title: 'Soberanía Nacional', description: 'Traslado del 20/11 - Día de la Soberanía Nacional' },

// Noviembre 2026
'2026-11-20': { type: 'holiday', title: 'Soberanía Nacional', description: 'Día de la Soberanía Nacional' },

// Diciembre 2025
'2025-12-08': { type: 'holiday', title: 'Inmaculada Concepción', description: 'Conmemoración religiosa' },
'2025-12-25': { type: 'holiday', title: 'Navidad', description: '¡Feliz Navidad a toda la comunidad claretiana!' },

// Diciembre 2026
'2026-12-08': { type: 'holiday', title: 'Inmaculada Concepción', description: 'Conmemoración religiosa' },
'2026-12-15': { type: 'birthday', title: 'Cumpleaños', description: '🎂 Valentina Racca' },
'2026-12-25': { type: 'holiday', title: 'Navidad', description: '¡Feliz Navidad a toda la comunidad claretiana!' }

};



function generateCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    document.getElementById('current-month').textContent = `${monthNames[month]} ${year}`;
    
    const calendarGrid = document.getElementById('calendar-grid');
    calendarGrid.innerHTML = '';
    
    // Empty cells before the month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'h-16';
        calendarGrid.appendChild(emptyCell);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const event = events[dateStr];
        const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
        
        dayCell.className = 'calendar-day h-16 flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all duration-300 border-2 border-transparent font-medium';
        
        if (isToday) {
            dayCell.className += ' ring-2 ring-ethnos-orange ring-opacity-50 bg-gradient-to-br from-ethnos-orange to-orange-500 text-white shadow-lg';
            dayCell.innerHTML = `<span class="text-lg font-bold">${day}</span><span class="text-xs">HOY</span>`;
        } else if (event) {
            if (event.type === 'birthday') {
                dayCell.className += ' bg-gradient-to-br from-pink-100 to-pink-200 text-pink-800 hover:from-pink-200 hover:to-pink-300 border-pink-300 shadow-md';
                dayCell.innerHTML = `<span class="text-lg font-bold">${day}</span><span class="text-2xl">🎂</span>`;
            } else if (event.type === 'event') {
                dayCell.className += ' bg-gradient-to-br from-orange-100 to-orange-200 text-ethnos-orange hover:from-orange-200 hover:to-orange-300 border-orange-300 shadow-md';
                dayCell.innerHTML = `<span class="text-lg font-bold">${day}</span><span class="text-2xl">⚽</span>`;
            } else if (event.type === 'holiday') {
                dayCell.className += ' bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 hover:from-blue-200 hover:to-blue-300 border-blue-300 shadow-md';
                dayCell.innerHTML = `<span class="text-lg font-bold">${day}</span><span class="text-2xl">📢</span>`;
            } else if (event.type === 'religion') {
                dayCell.className += ' bg-gradient-to-br from-red-100 to-red-200 text-red-800 hover:from-red-200 hover:to-red-300 border-red-300 shadow-md';
                dayCell.innerHTML = `<span class="text-lg font-bold">${day}</span><span class="text-2xl">⛪</span>`;
            } else if (event.type === 'cultural') {
                dayCell.className += ' bg-gradient-to-br from-purple-100 to-purple-200 text-purple-800 hover:from-purple-200 hover:to-purple-300 border-purple-300 shadow-md';
                dayCell.innerHTML = `<span class="text-lg font-bold">${day}</span><span class="text-2xl">🎭</span>`;
            } else if (event.type === 'school') {
                dayCell.className += ' bg-gradient-to-br from-green-100 to-green-200 text-green-800 hover:from-green-200 hover:to-green-300 border-green-300 shadow-md';
                dayCell.innerHTML = `<span class="text-lg font-bold">${day}</span><span class="text-2xl">🎒</span>`;
            } else {
                dayCell.className += ' bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300 border-gray-300 shadow-md';
                dayCell.innerHTML = `<span class="text-lg font-bold">${day}</span><span class="text-2xl">📅</span>`;
            }

            dayCell.title = `${event.title} - ${event.description}`;
            dayCell.onclick = () => {
                const eventIcons = {
                    birthday: '🎂',
                    event: '⚽',
                    holiday: '📢',
                    religion: '✏️',
                    cultural: '🎭',
                    school: '🎒',
                    other: '📅'
                };
                const eventIcon = eventIcons[event.type] || '📅';
                const eventDetails = event.details || event.description;
                showEventModal(eventIcon, event.title, event.description, eventDetails, dateStr);
            };
        } else {
            dayCell.className += ' bg-gray-50 text-ethnos-gray hover:bg-gray-100 hover:shadow-md hover:border-gray-300';
            dayCell.innerHTML = `<span class="text-lg font-bold">${day}</span>`;
        }
        
        calendarGrid.appendChild(dayCell);
    }
}

function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar();
}

function showEventModal(icon, title, description, details, dateStr) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    };
    
    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white rounded-2xl p-8 max-w-lg w-full max-h-96 overflow-y-auto shadow-2xl';
    
    modalContent.innerHTML = `
        <div class="text-center mb-6">
            <span class="text-6xl mb-4 block">${icon}</span>
            <h3 class="text-2xl font-bold text-ethnos-blue mb-2">${title}</h3>
            <p class="text-ethnos-gray font-medium">${description}</p>
            <div class="w-20 h-1 bg-gradient-to-r from-ethnos-blue to-ethnos-orange rounded-full mx-auto mt-4"></div>
        </div>
        
        <div class="mb-6">
            <p class="text-ethnos-gray leading-relaxed">${details}</p>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button onclick="addToGoogleCalendar('${dateStr}', '${title.replace(/'/g, "\\'")}', '${details.replace(/'/g, "\\'")}')" 
                    class="bg-ethnos-blue hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover-lift inline-flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
                Agregar a Google Calendar
            </button>
            <button onclick="closeModal()" 
                    class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover-lift">
                Cerrar
            </button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Add close function
    window.closeModal = () => {
        document.body.removeChild(modal);
        delete window.closeModal;
    };
}

function addToGoogleCalendar(dateStr, title, details) {
    const date = new Date(dateStr);
    const startDate = date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endDate = new Date(date.getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=Colegio`;
    
    window.open(googleCalendarUrl, '_blank');
}

function downloadCalendar() {
    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ETHNOS//Centro de Estudiantes//ES
CALSCALE:GREGORIAN
METHOD:PUBLISH
`;

    Object.keys(events).forEach(dateStr => {
        const event = events[dateStr];
        const date = new Date(dateStr);
        const startDate = date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        const endDate = new Date(date.getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        
        icsContent += `BEGIN:VEVENT
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${event.title}
DESCRIPTION:${event.details || event.description}
LOCATION:Colegio
UID:${dateStr}-ethnos@colegio.edu
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}
END:VEVENT
`;
    });

    icsContent += 'END:VCALENDAR';
    
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calendario-ethnos-2025.ics';
    a.click();
    URL.revokeObjectURL(url);
}

// Petition form functionality
function handlePetitionSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('petitionName').value;
    const course = document.getElementById('petitionCourse').value;
    const type = document.getElementById('petitionType').value;
    const message = document.getElementById('petitionMessage').value;
    const anonymous = document.getElementById('petitionAnonymous').checked;
    
    const submitterInfo = anonymous ? 'Anónimo' : `${name} (${course})`;
    
    alert(`🙏 ¡Petición Enviada!\n\nDe: ${submitterInfo}\nTipo: ${type}\nMensaje: ${message}\n\n✨ Tu petición será incluida en la próxima oración de la mañana con mucho cariño y respeto.\n\n¡Gracias por confiar en nosotros!`);
    
    document.getElementById('petitionForm').reset();
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    generateCalendar();
    
    const petitionForm = document.getElementById('petitionForm');
    if (petitionForm) {
        petitionForm.addEventListener('submit', handlePetitionSubmit);
    }
});
