class MysteryMatchApp {
    constructor() {
        this.currentUser = null;
        this.currentProfile = null;
        this.profiles = [];

        this.initEventListeners();
    }

    initEventListeners() {
        // Login Screen
        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));

        // Match Screen Actions
        document.getElementById('dislikeBtn').addEventListener('click', () => this.swipeProfile('dislike'));
        document.getElementById('likeBtn').addEventListener('click', () => this.swipeProfile('like'));
        document.getElementById('superLikeBtn').addEventListener('click', () => this.swipeProfile('superLike'));

        // Match Modal
        document.getElementById('continueBtn').addEventListener('click', () => this.closeMatchModal());
        document.getElementById('sendMessageBtn').addEventListener('click', () => this.sendMessage());
    }

    handleLogin(e) {
        e.preventDefault();
        // Simulated login
        this.currentUser = { 
            id: 1, 
            name: 'Alex', 
            age: 28, 
            profileImage: '/api/placeholder/400/400?text=You' 
        };
        
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('matchScreen').classList.remove('hidden');
        
        this.generateProfiles();
        this.loadNextProfile();
    }

    generateProfiles() {
        // Simulated profile generation with placeholder images
        this.profiles = [
            {
                id: 'mystery1',
                name: 'Taylor',
                age: 26,
                bio: 'Adventure seeker and coffee lover',
                interests: ['Travel', 'Photography', 'Hiking'],
                profileImage: '/api/placeholder/400/400?text=Taylor',
                isMatch: true
            },
            {
                id: 'mystery2',
                name: 'Jordan',
                age: 29,
                bio: 'Tech enthusiast and music producer',
                interests: ['Tech', 'Music', 'Cooking'],
                profileImage: '/api/placeholder/400/400?text=Jordan',
                isMatch: false
            },
            {
                id: 'mystery3',
                name: 'Riley',
                age: 24,
                bio: 'Art director with a passion for sustainable living',
                interests: ['Art', 'Design', 'Environment'],
                profileImage: '/api/placeholder/400/400?text=Riley',
                isMatch: false
            }
        ];
    }

    loadNextProfile() {
        if (this.profiles.length === 0) {
            this.generateProfiles(); // Regenerate if empty
        }

        this.currentProfile = this.profiles.pop();
        
        document.getElementById('profileImage').src = this.currentProfile.profileImage;
        document.getElementById('profileName').textContent = `${this.currentProfile.name}, ${this.currentProfile.age}`;
        document.getElementById('profileBio').textContent = this.currentProfile.bio;

        // Update interests
        const interestsContainer = document.querySelector('.profile-interests');
        interestsContainer.innerHTML = '';
        this.currentProfile.interests.forEach(interest => {
            const span = document.createElement('span');
            span.classList.add('interest');
            span.textContent = interest;
            interestsContainer.appendChild(span);
        });
    }

    swipeProfile(action) {
        // Simulate swipe interaction
        if (action === 'like' && this.currentProfile.isMatch) {
            this.showMatchModal();
        } else if (action === 'superLike' && this.currentProfile.isMatch) {
            this.showMatchModal();
        }

        // Load next profile
        this.loadNextProfile();
    }

    showMatchModal() {
        const modal = document.getElementById('matchModal');
        const matchName = document.getElementById('matchName');
        const yourProfile = document.getElementById('yourMatchProfile');
        const matchProfile = document.getElementById('matchedProfile');

        matchName.textContent = this.currentProfile.name;
        yourProfile.src = this.currentUser.profileImage;
        matchProfile.src = this.currentProfile.profileImage;

        modal.classList.remove('hidden');
    }

    closeMatchModal() {
        document.getElementById('matchModal').classList.add('hidden');
    }

    sendMessage() {
        // Placeholder for messaging functionality
        alert(`Sending message to ${this.currentProfile.name}`);
        this.closeMatchModal();
    }
}

// Initialize the app
const app = new MysteryMatchApp();