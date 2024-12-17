class MysteryMatchApp {
    constructor() {
        this.currentUser = null;
        this.currentProfile = null;
        this.profiles = [];

        this.initEventListeners();
    }

    initEventListeners() {
        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('dislikeBtn').addEventListener('click', () => this.swipeProfile('dislike'));
        document.getElementById('likeBtn').addEventListener('click', () => this.swipeProfile('like'));
        document.getElementById('superLikeBtn').addEventListener('click', () => this.swipeProfile('superLike'));
        
        // Match Screen Listeners
        document.getElementById('continueSwipingBtn').addEventListener('click', () => this.continueSwipe());
        document.getElementById('sendMessageBtn').addEventListener('click', () => this.sendMessage());
    }

    handleLogin(e) {
        e.preventDefault();
        this.currentUser = { 
            id: 1, 
            name: 'Alex', 
            age: 28, 
            profileImage: '/api/placeholder/400/400?text=Your+Profile' 
        };
        
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('matchScreen').classList.remove('hidden');
        
        this.generateProfiles();
        this.loadNextProfile();
    }

    generateProfiles() {
        const adventureProfiles = [
            {
                id: 'mystery1',
                name: 'Taylor',
                age: 26,
                bio: 'Adventure seeker and coffee lover',
                interests: ['Travel', 'Photography', 'Hiking'],
                profileImage: '/api/placeholder/400/400?text=Taylor+Profile',
                isMatch: true
            },
            {
                id: 'mystery2',
                name: 'Jordan',
                age: 29,
                bio: 'Tech enthusiast and music producer',
                interests: ['Tech', 'Music', 'Cooking'],
                profileImage: '/api/placeholder/400/400?text=Jordan+Profile',
                isMatch: false
            },
            {
                id: 'mystery3',
                name: 'Riley',
                age: 24,
                bio: 'Art director with a passion for sustainable living',
                interests: ['Art', 'Design', 'Environment'],
                profileImage: '/api/placeholder/400/400?text=Riley+Profile',
                isMatch: false
            }
        ];

        this.profiles = adventureProfiles.sort(() => Math.random() - 0.5);
    }

    loadNextProfile() {
        if (this.profiles.length === 0) {
            this.generateProfiles();
        }

        this.currentProfile = this.profiles.pop();
        
        const profileImageEl = document.getElementById('profileImage');
        const profileNameEl = document.getElementById('profileName');
        const profileBioEl = document.getElementById('profileBio');
        const interestsContainer = document.querySelector('.profile-interests');

        profileImageEl.src = this.currentProfile.profileImage;
        profileNameEl.textContent = `${this.currentProfile.name}, ${this.currentProfile.age}`;
        profileBioEl.textContent = this.currentProfile.bio;

        interestsContainer.innerHTML = '';
        this.currentProfile.interests.forEach(interest => {
            const span = document.createElement('span');
            span.classList.add('interest');
            span.textContent = interest;
            interestsContainer.appendChild(span);
        });
    }

    swipeProfile(action) {
        const swipeCard = document.getElementById('swipeCard');
        
        swipeCard.style.transition = 'transform 0.5s ease';
        
        if (action === 'like') {
            swipeCard.style.transform = 'translateX(100%) rotate(15deg)';
        } else if (action === 'dislike') {
            swipeCard.style.transform = 'translateX(-100%) rotate(-15deg)';
        }

        // Simulate match
        if ((action === 'like' || action === 'superLike') && this.currentProfile.isMatch) {
            setTimeout(() => this.showMatchScreen(), 300);
            return;
        }

        // Load next profile after animation
        setTimeout(() => {
            this.loadNextProfile();
            swipeCard.style.transition = 'none';
            swipeCard.style.transform = 'none';
        }, 500);
    }

    showMatchScreen() {
        const matchScreen = document.getElementById('matchedScreen');
        const matchScreen2 = document.getElementById('matchScreen');
        const matchName = document.getElementById('matchName');
        const yourProfile = document.getElementById('yourMatchProfile');
        const matchedProfile = document.getElementById('matchedProfile');

        matchName.textContent = this.currentProfile.name;
        yourProfile.src = this.currentUser.profileImage;
        matchedProfile.src = this.currentProfile.profileImage;

        matchScreen2.classList.add('hidden');
        matchScreen.classList.remove('hidden');
    }

    continueSwipe() {
        const matchScreen = document.getElementById('matchedScreen');
        const matchScreen2 = document.getElementById('matchScreen');

        matchScreen.classList.add('hidden');
        matchScreen2.classList.remove('hidden');
        
        this.loadNextProfile();
    }

    sendMessage() {
        alert(`Sending message to ${this.currentProfile.name}`);
    }
}

// Initialize the app
const app = new MysteryMatchApp();