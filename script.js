function ouvrirSection(evenement, nomSection) {
    // 1. On récupère toutes les sections
    const toutesLesSections = document.querySelectorAll('main section');
    const sectionAccueil = document.getElementById('homepage');

    // 2. CACHER TOUT par défaut
    toutesLesSections.forEach(section => {
        section.style.display = 'none';
    });

    // 3. LOGIQUE D'AFFICHAGE
    if (nomSection === 'viewAll') {
        // Affiche tout SAUF l'accueil
        toutesLesSections.forEach(section => {
            if (section.id !== 'homepage') {
                section.style.display = 'block';
            }
        });
    } else {
        // Affiche uniquement la section demandée
        const sectionAffichee = document.getElementById(nomSection);
        if (sectionAffichee) {
            sectionAffichee.style.display = 'block';
        }
    }

    // 4. GÉRER LE STYLE DES BOUTONS (Bordure blanche)
    const tousLesBoutons = document.querySelectorAll('.nav-item');
    tousLesBoutons.forEach(btn => btn.classList.remove('active'));
    
    // On vérifie que evenement existe (pour le chargement initial)
    if(evenement) {
        evenement.currentTarget.classList.add('active');
    }
}

// Lancement au démarrage
document.addEventListener('DOMContentLoaded', () => {
    // Affiche l'accueil par défaut
    ouvrirSection(null, 'homepage'); 
    document.querySelector('.nav-homepage').classList.add('active');
});

// dialogue
// 1. Sélection sécurisée des éléments
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const contactModal = document.getElementById('contactModal');
const modalHeader = document.getElementById('modalHeader');

// 2. Fonction pour OUVRIR (à appeler sur ton bouton "Me contacter")
function openModal() {
    if (contactModal) {
        contactModal.showModal();
    } else {
        console.error("Erreur : La modale avec l'ID 'contactModal' est introuvable dans le HTML.");
    }
}

// 3. Fonction pour FERMER
function closeModal() {
    if (contactModal) {
        contactModal.close();
    }
}

// 4. Gestion de l'envoi du formulaire
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(contactForm);
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // On cache le formulaire et le titre
                if(contactForm) contactForm.style.display = 'none';
                if(modalHeader) modalHeader.style.display = 'none';
                // On montre le succès
                if(successMessage) successMessage.style.display = 'block';
                
                contactForm.reset();

                setTimeout(() => {
                    closeModal();
                    // On remet tout en place pour la prochaine fois
                    if(contactForm) contactForm.style.display = 'flex';
                    if(modalHeader) modalHeader.style.display = 'block';
                    if(successMessage) successMessage.style.display = 'none';
                }, 3000);
            }
        } catch (error) {
            alert("Erreur de connexion.");
        }
    });
}