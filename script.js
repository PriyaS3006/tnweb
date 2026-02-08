const { useState, useEffect, useMemo } = React;

// --- TRANSLATIONS ---
const TEXT = {
    English: {
        nav: { home: 'Home', dashboard: 'Dashboard', services: 'Services', help: 'Help', lang: 'Language' },
        hero: {
            tag: '✨ Next-Gen Citizen Services',
            title1: 'Empowering Citizens,',
            title2: 'Enabling Governance.',
            desc: 'An AI-powered intelligence system for seamless grievance redressal and welfare scheme discovery.',
            btnReport: 'File a Complaint',
            btnSchemes: 'Browse Schemes'
        },
        form: {
            title: 'Report a Grievance',
            subtitle: 'Secure & Verified Submission',
            sec1: '1. Applicant Identity',
            sec2: '2. Grievance Location',
            sec3: '3. Grievance Details',
            aadhar: 'Aadhar Number',
            mobile: 'Mobile Number',
            name: 'Applicant Full Name',
            district: 'District',
            taluk: 'Taluk',
            village: 'Village / Ward',
            pincode: 'Pincode',
            desc: 'Description',
            category: 'Problem Category',
            submit: 'Submit Grievance',
            submitting: 'Submitting...',
            getOtp: 'Get OTP',
            enterOtp: 'Enter OTP',
            verify: 'Verify',
            resend: 'Resend',
            verified: 'Mobile Number Verified',
            successTitle: 'Grievance Submitted!',
            successMsg: 'Thank you',
            idMsg: 'Your Complaint ID is',
            close: 'Close',
            evidence: 'Add Evidence'
        },
        helpModal: {
            title: 'Help & Support',
            sec1Title: 'Submit Your Grievance',
            sec1Desc: 'Fill in your complaint details and upload proof if available. Ensure your mobile number is verified for tracking.',
            sec2Title: 'AI Analysis',
            sec2Desc: 'Our system automatically classifies the issue, assigns priority, and identifies the responsible department to speed up resolution.',
            sec3Title: 'Welfare Support',
            sec3Desc: 'Eligible citizens receive welfare scheme recommendations based on their grievance context and profile.',
            btn: 'Got it'
        },
        features: [
            { title: 'AI Grievance Analysis', desc: 'Our system uses NLP to automatically categorize and route complaints to the right department instantly.' },
            { title: 'Real-Time Tracking', desc: 'Track the status of your application or complaint in real-time with granular updates and notifications.' },
            { title: 'Welfare Matching', desc: 'Discover government schemes tailored specifically for you based on your profile and eligibility criteria.' }
        ],
        auth: {
            menu: 'Menu',
            login: 'Authority Login',
            title: 'Official Authority Login',
            subtitle: 'Restricted Access for Department Officials',
            username: 'Username',
            password: 'Password',
            btnLogin: 'Login to Dashboard'
        }
    },
    Tamil: {
        nav: { home: 'முகப்பு', dashboard: 'முகப்பு பலகை', services: 'சேவைகள்', help: 'உதவி', lang: 'மொழி' },
        hero: {
            tag: '✨ அடுத்த தலைமுறை குடிமக்கள் சேவைகள்',
            title1: 'குடிமக்களை மேம்படுத்துதல்,',
            title2: 'ஆளுமையை செயல்படுத்துதல்.',
            desc: 'குறைதீர்க்கும் மற்றும் நலத்திட்டங்களைக் கண்டறிவதற்கான AI-இயக்கப்படும் நுண்ணறிவு அமைப்பு.',
            btnReport: 'புகார் அளிக்க',
            btnSchemes: 'திட்டங்கள்'
        },
        form: {
            title: 'புகார் அளிக்கவும்',
            subtitle: 'பாதுகாப்பான மற்றும் சரிபார்க்கப்பட்ட பதிவு',
            sec1: '1. விண்ணப்பதாரர் அடையாளம்',
            sec2: '2. குறை இருப்பிடம்',
            sec3: '3. குறை விவரங்கள்',
            aadhar: 'ஆதார் எண்',
            mobile: 'மொபைல் எண்',
            name: 'விண்ணப்பதாரர் முழு பெயர்',
            district: 'மாவட்டம்',
            taluk: 'வட்டம் (தாலுகா)',
            village: 'கிராமம் / வார்டு',
            pincode: 'அஞ்சல் குறியீடு',
            desc: 'விளக்கம்',
            submit: 'புகாரைச் சமர்ப்பிக்கவும்',
            submitting: 'சமர்ப்பிக்கிறது...',
            getOtp: 'OTP பெறவும்',
            enterOtp: 'OTP உள்ளிடவும்',
            verify: 'சரிபார்க்கவும்',
            resend: 'மீண்டும் அனுப்பவும்',
            verified: 'மொபைல் எண் சரிபார்க்கப்பட்டது',
            successTitle: 'புகார் சமர்ப்பிக்கப்பட்டது!',
            successMsg: 'நன்றி',
            idMsg: 'உங்கள் புகார் எண்',
            close: 'மூடு',
            evidence: 'ஆதாரம் சேர்க்க'
        },
        helpModal: {
            title: 'உதவி & ஆதரவு',
            sec1Title: 'உங்கள் புகாரைச் சமர்ப்பிக்கவும்',
            sec1Desc: 'உங்கள் புகார் விவரங்களைப் பூர்த்தி செய்து ஆதாரம் இருந்தால் பதிவேற்றவும். கண்காணிப்புக்கு உங்கள் மொபைல் எண் சரிபார்க்கப்பட்டுள்ளதா என்பதை உறுதிப்படுத்தவும்.',
            sec2Title: 'AI பகுப்பாய்வு',
            sec2Desc: 'எங்கள் அமைப்பு சிக்கலை தானாகவே வகைப்படுத்தி, முன்னுரிமையை ஒதுக்கி, தீர்வை விரைவுபடுத்த பொறுப்பான துறையை அடையாளம் காண்கிறது.',
            sec3Title: 'நலத்திட்ட ஆதரவு',
            sec3Desc: 'தகுதியான குடிமக்கள் தங்கள் புகார் சூழல் மற்றும் சுயவிவரத்தின் அடிப்படையில் நலத்திட்ட பரிந்துரைகளைப் பெறுகிறார்கள்.',
            btn: 'புரிந்தது'
        },
        features: [
            { title: 'AI புகார் பகுப்பாய்வு', desc: 'எங்கள் அமைப்பு புகார்களை உடனடியாக சரியான துறைக்கு வகைப்படுத்தி அனுப்ப NLP ஐப் பயன்படுத்துகிறது.' },
            { title: 'நிகழ்நேர கண்காணிப்பு', desc: 'உங்கள் விண்ணப்பம் அல்லது புகாரின் நிலையை நிகழ்நேரத்தில் துல்லியமான புதுப்பிப்புகளுடன் கண்காணிக்கவும்.' },
            { title: 'நலத்திட்ட பொருத்தம்', desc: 'உங்கள் சுயவிவரம் மற்றும் தகுதி அளவுகோல்களின் அடிப்படையில் உங்களுக்காகவே வடிவமைக்கப்பட்ட அரசு திட்டங்களைக் கண்டறியவும்.' }
        ],
        auth: {
            menu: 'மெனு',
            login: 'அதிகாரி உள்நுழைவு',
            title: 'அதிகாரப்பூர்வ உள்நுழைவு',
            subtitle: 'துறை அதிகாரிகளுக்கான மட்டுப்படுத்தப்பட்ட அணுகல்',
            username: 'பயனர் பெயர்',
            password: 'கடவுச்சொல்',
            btnLogin: 'உள்நுழையவும்'
        }
    },
    Hindi: {
        nav: { home: 'होम', dashboard: 'डैशबोर्ड', services: 'सेवाएं', help: 'मदद', lang: 'भाषा' },
        hero: {
            tag: '✨ अगली पीढ़ी की नागरिक सेवाएं',
            title1: 'नागरिकों को सशक्त बनाना,',
            title2: 'शासन को सक्षम बनाना।',
            desc: 'सहज शिकायत निवारण और कल्याण योजना की खोज के लिए एक एआई-संचालित खुफिया प्रणाली।',
            btnReport: 'शिकायत दर्ज करें',
            btnSchemes: 'योजनाएं'
        },
        form: {
            title: 'शिकायत दर्ज करें',
            subtitle: 'सुरक्षित और सत्यापित जमा',
            sec1: '1. आवेदक की पहचान',
            sec2: '2. शिकायत का स्थान',
            sec3: '3. शिकायत विवरण',
            aadhar: 'आधार संख्या',
            mobile: 'मोबाइल नंबर',
            name: 'आवेदक का पूरा नाम',
            district: 'ज़िला',
            taluk: 'तालुका',
            village: 'गाँव / वार्ड',
            pincode: 'पिन कोड',
            desc: 'विवरण',
            submit: 'शिकायत जमा करें',
            submitting: 'जमा हो रहा है...',
            getOtp: 'ओटीपी प्राप्त करें',
            enterOtp: 'ओटीपी दर्ज करें',
            verify: 'सत्यापित करें',
            resend: 'पुनः भेजें',
            verified: 'मोबाइल नंबर सत्यापित',
            successTitle: 'शिकायत जमा की गई!',
            successMsg: 'धन्यवाद',
            idMsg: 'आपकी शिकायत आईडी है',
            close: 'बंद करें',
            evidence: 'सबूत जोड़ें'
        },
        helpModal: {
            title: 'मदद और समर्थन',
            sec1Title: 'अपनी शिकायत जमा करें',
            sec1Desc: 'अपनी शिकायत का विवरण भरें और यदि उपलब्ध हो तो प्रमाण अपलोड करें। ट्रैकिंग के लिए सुनिश्चित करें कि आपका मोबाइल नंबर सत्यापित है।',
            sec2Title: 'एआई विश्लेषण',
            sec2Desc: 'हमारा सिस्टम समस्या को स्वचालित रूप से वर्गीकृत करता है, प्राथमिकता देता है, और समाधान में तेजी लाने के लिए जिम्मेदार विभाग की पहचान करता है।',
            sec3Title: 'कल्याण सहायता',
            sec3Desc: 'पात्र नागरिकों को उनकी शिकायत के संदर्भ और प्रोफ़ाइल के आधार पर कल्याण योजना की सिफारिशें मिलती हैं।',
            btn: 'समझ गया'
        },
        features: [
            { title: 'एआई शिकायत विश्लेषण', desc: 'हमारा सिस्टम शिकायतों को तुरंत सही विभाग में वर्गीकृत और रूट करने के लिए एनएलपी का उपयोग करता है।' },
            { title: 'वास्तविक समय ट्रैकिंग', desc: 'विस्तृत अपडेट और सूचनाओं के साथ वास्तविक समय में अपने आवेदन या शिकायत की स्थिति को ट्रैक करें।' },
            { title: 'कल्याण मिलान', desc: 'अपनी प्रोफ़ाइल और पात्रता मानदंडों के आधार पर विशेष रूप से आपके लिए तैयार की गई सरकारी योजनाओं की खोज करें।' }
        ],
        auth: {
            menu: 'मेन्नु',
            login: 'अधिकारी लॉगिन',
            title: 'आधिकारिक प्राधिकरण लॉगिन',
            subtitle: 'विभाग के अधिकारियों के लिए प्रतिबंधित पहुंच',
            username: 'उपयोगकर्ता नाम',
            password: 'पासवर्ड',
            btnLogin: 'लॉग इन करें'
        }
    }
};

// --- HELPER COMPONENTS ---

// Searchable Select Component (Autocomplete)
const SearchableSelect = ({ options, value, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOptions = options.filter(opt =>
        opt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        if (value && options.includes(value)) setSearchTerm('');
    }, [value]);

    return (
        <div style={{ position: 'relative' }}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%', padding: '0.75rem', borderRadius: '0.5rem',
                    background: '#f8fafc', border: '1px solid #e2e8f0', color: value ? 'black' : '#94a3b8',
                    cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}
            >
                {value || placeholder}
                <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>▼</span>
            </div>

            {isOpen && (
                <div style={{
                    position: 'absolute', top: '100%', left: 0, right: 0,
                    background: 'white', border: '1px solid #e2e8f0', borderRadius: '0.5rem',
                    marginTop: '0.25rem', maxHeight: '200px', overflowY: 'auto', zIndex: 50,
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                }}>
                    <input
                        type="text"
                        placeholder="Type to search..."
                        autoFocus
                        style={{
                            width: '100%', padding: '0.5rem', border: 'none', borderBottom: '1px solid #eee',
                            outline: 'none', background: '#f9f9f9', fontSize: '0.9rem'
                        }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                    />
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map(opt => (
                            <div
                                key={opt}
                                onClick={() => { onChange(opt); setIsOpen(false); setSearchTerm(''); }}
                                style={{
                                    padding: '0.5rem 0.75rem', cursor: 'pointer', borderBottom: '1px solid #f1f5f9',
                                    fontSize: '0.9rem', color: 'black'
                                }}
                                onMouseEnter={(e) => e.target.style.background = '#f1f5f9'}
                                onMouseLeave={(e) => e.target.style.background = 'white'}
                            >
                                {opt}
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: '0.5rem', color: '#94a3b8', fontSize: '0.8rem', textAlign: 'center' }}>No results</div>
                    )}
                </div>
            )}
            {isOpen && <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 40 }} onClick={() => setIsOpen(false)} />}
        </div>
    );
};

// --- COMPONENTS ---

// 1. Header
function Header({ onNavigate, isScrolled, language, setLanguage }) {
    const [scrolled, setScrolled] = useState(false);
    const t = TEXT[language].nav;


    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (page) => (e) => {
        e.preventDefault();
        onNavigate(page);
    }

    const linkStyle = {
        fontSize: '0.95rem',
        fontWeight: '500',
        color: 'var(--color-text-main)',
        cursor: 'pointer'
    };

    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                transition: 'all 0.3s ease',
                padding: scrolled || isScrolled ? '1rem 0' : '1.5rem 0',
                background: scrolled || isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                backdropFilter: scrolled || isScrolled ? 'blur(12px)' : 'none',
                borderBottom: scrolled || isScrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
                boxShadow: scrolled || isScrolled ? '0 4px 6px -1px rgba(0,0,0,0.05)' : 'none'
            }}
        >
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* LEFT: Logo */}
                <a href="/" onClick={handleClick('home')} style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.025em', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'black' }}>
                    <div style={{ width: '2rem', height: '2rem', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', borderRadius: '8px' }}></div>
                    CivicSense
                </a>

                {/* RIGHT: Navigation Items */}
                <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            style={{
                                appearance: 'none',
                                background: 'transparent',
                                border: 'none',
                                fontSize: '0.95rem',
                                fontWeight: '500',
                                cursor: 'pointer',
                                paddingRight: '1.2rem',
                                outline: 'none',
                                color: 'var(--color-text-main)'
                            }}
                        >
                            <option value="English">English</option>
                            <option value="Tamil">தமிழ் (Tamil)</option>
                            <option value="Hindi">हिंदी (Hindi)</option>
                        </select>
                        <span style={{ position: 'absolute', right: 0, pointerEvents: 'none', fontSize: '0.8rem' }}>▼</span>
                    </div>

                    <a href="#" onClick={handleClick('home')} style={linkStyle}>{t.home}</a>
                    <a href="#" onClick={handleClick('dashboard')} style={linkStyle}>{t.dashboard}</a>
                    <a href="#" onClick={handleClick('services')} style={linkStyle}>{t.services}</a>
                    <a href="#" onClick={handleClick('help')} style={linkStyle}>{t.help}</a>

                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} className="departments-container">
                        <span style={{ cursor: 'pointer', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.25rem' }} onClick={() => document.getElementById('dept-menu').classList.toggle('hidden')}>
                            Departments <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>▼</span>
                        </span>
                        <div id="dept-menu" className="hidden glass" style={{
                            position: 'absolute', top: '100%', right: 0,
                            background: 'white', border: '1px solid #e2e8f0', borderRadius: '0.5rem',
                            marginTop: '0.5rem', minWidth: '240px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                            display: 'none', flexDirection: 'column', zIndex: 100
                        }}>
                            {[
                                { name: '🚰 Water Supply Department', id: 'water' },
                                { name: '⚡ Tamil Nadu Electricity Board', id: 'electricity' },
                                { name: '👥 Social Welfare Department', id: 'welfare' },
                                { name: '🏢 Revenue Department', id: 'revenue' },
                                { name: '🚌 Transport Department', id: 'transport' }
                            ].map(dept => (
                                <div
                                    key={dept.id}
                                    onClick={(e) => {
                                        handleClick('dept-login')(e);
                                        document.getElementById('dept-menu').classList.add('hidden');
                                    }}
                                    style={{ padding: '0.75rem 1rem', fontSize: '0.9rem', color: '#1e293b', fontWeight: '500', cursor: 'pointer', transition: 'background 0.2s' }}
                                    onMouseEnter={(e) => e.target.style.background = '#f1f5f9'}
                                    onMouseLeave={(e) => e.target.style.background = 'white'}
                                >
                                    {dept.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginLeft: '1rem' }} className="menu-container">
                        <button onClick={() => document.getElementById('auth-menu').classList.toggle('hidden')} style={{ fontSize: '1.5rem', cursor: 'pointer', padding: '0.5rem' }}>≡</button>
                        <div id="auth-menu" className="hidden glass" style={{
                            position: 'absolute', top: '100%', right: 0,
                            background: 'white', border: '1px solid #e2e8f0', borderRadius: '0.5rem',
                            marginTop: '0.5rem', minWidth: '150px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                            display: 'none', flexDirection: 'column'
                        }}>
                            <a href="#" onClick={(e) => { handleClick('auth-login')(e); document.getElementById('auth-menu').classList.add('hidden'); }}
                                style={{ padding: '0.75rem 1rem', fontSize: '0.9rem', color: '#1e293b', fontWeight: '500', display: 'block', textDecoration: 'none' }}
                                onMouseEnter={(e) => e.target.style.background = '#f1f5f9'}
                                onMouseLeave={(e) => e.target.style.background = 'white'}
                            >
                                {TEXT[language].auth.login}
                            </a>
                        </div>
                    </div>
                    <style>{`
                .hidden { display: none !important; }
                #dept-menu:not(.hidden), #auth-menu:not(.hidden) { display: flex !important; }
            `}</style>
                </nav>
            </div>
        </header>
    );
}

// 2. Hero
function Hero({ language }) {
    const t = TEXT[language].hero;
    return (
        <section style={{
            paddingTop: '8rem',
            paddingBottom: '6rem',
            minHeight: '90vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                zIndex: -1,
                pointerEvents: 'none'
            }}></div>

            <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
                <div style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    background: 'rgba(139, 92, 246, 0.1)',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    color: '#7c3aed',
                    marginBottom: '1.5rem',
                    fontWeight: '600'
                }}>
                    ✨ Next-Gen Citizen Services
                </div>

                <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: '800',
                    lineHeight: '1.1',
                    marginBottom: '1.5rem',
                    letterSpacing: '-0.03em'
                }}>
                    Empowering Citizens,<br />
                    <span className="text-gradient">Enabling Governance.</span>
                </h1>

                <p style={{
                    fontSize: '1.125rem',
                    color: 'var(--color-text-muted)',
                    marginBottom: '2.5rem',
                    lineHeight: '1.6',
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    An AI-powered intelligence system for seamless grievance redressal and welfare scheme discovery.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button
                        className="btn btn-primary"
                        style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}
                        onClick={() => document.dispatchEvent(new CustomEvent('open-grievance'))}
                    >
                        File a Complaint
                    </button>
                </div>
            </div>
        </section>
    );
}

// 3. Features
const FeatureCard = ({ title, description, icon }) => (
    <div className="glass" style={{
        padding: '2rem',
        borderRadius: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'transform 0.3s ease',
    }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
        <div style={{
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '1rem',
            background: 'rgba(139, 92, 246, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            marginBottom: '0.5rem',
            color: '#7c3aed'
        }}>
            {icon}
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{title}</h3>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{description}</p>
    </div>
);

function Features({ language }) {
    const strings = TEXT[language].features;
    const features = [
        {
            title: strings[0].title,
            description: strings[0].desc,
            icon: '🤖'
        },
        {
            title: strings[1].title,
            description: strings[1].desc,
            icon: '📍'
        },
        {
            title: strings[2].title,
            description: strings[2].desc,
            icon: '🧩'
        }
    ];

    return (
        <section className="section">
            <div className="container">
                <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>Intelligent Governance</h2>
                    <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                        Advanced tools designed to streamline public administration and improve citizen satisfaction.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {features.map((f, i) => <FeatureCard key={i} {...f} />)}
                </div>
            </div>
        </section>
    );
}

// 4. Dashboard
const StatCard = ({ label, value, trend, color }) => (
    <div className="glass" style={{ padding: '1.5rem', borderRadius: '1rem', borderTop: `4px solid ${color}` }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{label}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
            <span style={{ fontSize: '2rem', fontWeight: '700' }}>{value}</span>
            <span style={{ color: 'var(--color-success)', fontSize: '0.875rem', fontWeight: '500' }}>{trend}</span>
        </div>
    </div>
);

const ActivityItem = ({ type, title, time, status }) => (
    <div style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {type === 'grievance' ? '📋' : '🔔'}
        </div>
        <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '500' }}>{title}</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{time}</p>
        </div>
        <div style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', borderRadius: '1rem', background: status === 'Resolved' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)', color: status === 'Resolved' ? '#34d399' : '#fbbf24', height: 'fit-content' }}>
            {status}
        </div>
    </div>
);

function Dashboard() {
    return (
        <section className="section" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
            <div className="container">
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>My Dashboard</h2>
                        <p style={{ color: 'var(--color-text-muted)' }}>Welcome back, Citizen</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => document.dispatchEvent(new CustomEvent('open-grievance'))}>New Request</button>
                </div>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    <StatCard label="Active Grievances" value="3" trend="+1 this week" color="#3b82f6" />
                    <StatCard label="Resolved" value="12" trend="+15% vs last month" color="#10b981" />
                    <StatCard label="Welfare Schemes" value="5" trend="2 new matches" color="#f59e0b" />
                    <StatCard label="Community Score" value="850" trend="Top 10%" color="#6366f1" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                    <div className="glass" style={{ borderRadius: '1.5rem', padding: '1.5rem', height: 'fit-content' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Recent Activity</h3>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <ActivityItem type="grievance" title="Street Light Malfunction - 2nd Avenue" time="Submitted 2 hours ago" status="Pending" />
                            <ActivityItem type="grievance" title="Garbage Collection Missed" time="Resolved yesterday" status="Resolved" />
                            <ActivityItem type="alert" title="Water Supply Interruption Alert" time="2 days ago" status="Notice" />
                        </div>
                    </div>

                    <div className="glass" style={{ borderRadius: '1.5rem', padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>🤖 AI Welfare Recommendations</h3>
                        <div style={{ padding: '1rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '1rem', marginBottom: '1rem', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <h4 style={{ fontWeight: '600', color: '#a78bfa' }}>Higher Education Scholarship '26</h4>
                                <span style={{ fontSize: '0.8rem', background: 'white', color: 'black', padding: '0.1rem 0.5rem', borderRadius: '4px', fontWeight: '700' }}>98% Match</span>
                            </div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>Based on your recent profile update, you are eligible for the State Merit Scholarship.</p>
                            <button className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>Check Eligibility</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// 5. Help Modal
function HelpModal({ onClose, language }) {
    const t = TEXT[language].helpModal;
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)', zIndex: 110,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
            <div className="glass" style={{
                width: '100%', maxWidth: '500px', background: 'white',
                borderRadius: '1.5rem', padding: '2rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{t.title}</h2>
                    <button onClick={onClose} style={{ fontSize: '1.5rem', color: '#64748b' }}>&times;</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#7c3aed', marginBottom: '0.5rem' }}>{t.sec1Title}</h3>
                        <p style={{ color: '#475569', fontSize: '0.95rem' }}>{t.sec1Desc}</p>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#7c3aed', marginBottom: '0.5rem' }}>{t.sec2Title}</h3>
                        <p style={{ color: '#475569', fontSize: '0.95rem' }}>{t.sec2Desc}</p>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#7c3aed', marginBottom: '0.5rem' }}>{t.sec3Title}</h3>
                        <p style={{ color: '#475569', fontSize: '0.95rem' }}>{t.sec3Desc}</p>
                    </div>
                </div>

                <button onClick={onClose} className="btn btn-primary" style={{ width: '100%', marginTop: '2rem' }}>{t.btn}</button>
            </div>
        </div>
    );
}

// 6. Authority Login
function AuthorityLogin({ language, onLogin }) {
    const t = TEXT[language].auth;
    const [creds, setCreds] = useState({ username: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock Login - Any input works for demo
        alert('Login Successful (Mock)');
        onLogin();
    };

    return (
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)' }}>
            <div className="glass" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', borderRadius: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ width: '3rem', height: '3rem', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', borderRadius: '12px', margin: '0 auto 1rem auto' }}></div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{t.title}</h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{t.subtitle}</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: '#475569' }}>{t.username}</label>
                        <input type="text" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', outline: 'none' }}
                            value={creds.username} onChange={e => setCreds({ ...creds, username: e.target.value })} />
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: '#475569' }}>{t.password}</label>
                        <input type="password" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', outline: 'none' }}
                            value={creds.password} onChange={e => setCreds({ ...creds, password: e.target.value })} />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>{t.btnLogin}</button>
                </form>
            </div>
        </section>
    );
}
// 7. Department Login
function DepartmentLogin({ onLogin, onBack }) {
    const [deptId, setDeptId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (deptId && username && password) {
            alert(`Login Successful for Department ID: ${deptId}`);
            onLogin(deptId);
        } else {
            alert('Please fill all fields');
        }
    };

    return (
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)' }}>
            <div className="glass" style={{ width: '100%', maxWidth: '450px', padding: '2.5rem', borderRadius: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', position: 'relative' }}>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ width: '3rem', height: '3rem', background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', borderRadius: '12px', margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🏢</div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Department Authority Login</h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Secure Access for Govt Officials</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: '#475569' }}>Department ID</label>
                        <input type="text" placeholder="e.g., DEPT-001" required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', outline: 'none' }}
                            value={deptId} onChange={e => setDeptId(e.target.value)} />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: '#475569' }}>Officer Username</label>
                        <input type="text" placeholder="Officer Name" required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', outline: 'none' }}
                            value={username} onChange={e => setUsername(e.target.value)} />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: '#475569' }}>Password</label>
                        <input type="password" placeholder="••••••••" required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', outline: 'none' }}
                            value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>🔵 Login</button>
                    <button type="button" onClick={onBack} className="btn" style={{ width: '100%', border: '1px solid #e2e8f0', color: '#64748b' }}>⬅️ Back to Home</button>
                </form>
            </div>
        </section>
    );
}

// 5. Grievance Form
function GrievanceAIForm({ onClose, language }) {
    const t = TEXT[language].form;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Verification State
    const [verified, setVerified] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');

    // AI Analysis State
    const [aiAnalysis, setAiAnalysis] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        aadhar: '',
        mobile: '',
        district: '',
        taluk: '',
        village: '',
        pincode: '',
        description: '',
        category: '', // This will be set by AI
        evidence: null
    });

    // Comprehensive Tamil Nadu Data (Mock but representative)
    const districts = [
        'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode',
        'Kallakurichi', 'Kancheepuram', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam',
        'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem',
        'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli',
        'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram',
        'Virudhunagar'
    ];

    // Simplified Mapping for Demo (In a real app, this would be a full JSON or API fetch)
    const taluks = [
        'Alandur', 'Ambattur', 'Aminjikarai', 'Ayanavaram', 'Egmore', 'Guindy', 'Madhavaram', 'Maduravoyal', 'Mambalam',
        'Mylapore', 'Perambur', 'Purasawalkam', 'Sholinganallur', 'Thiruvottiyur', 'Tondiarpet', 'Velachery', // Chennai
        'Coimbatore North', 'Coimbatore South', 'Pollachi', 'Mettupalayam', 'Sulur', 'Valparai', // Coimbatore
        'Madurai East', 'Madurai North', 'Madurai South', 'Madurai West', 'Melur', 'Thiruparankundram', 'Usilampatti', // Madurai
        'Lalgudi', 'Manachanallur', 'Musiri', 'Srirangam', 'Thottiyam', 'Thuraiyur', 'Tiruchirappalli East', 'Tiruchirappalli West', // Trichy
        'Attur', 'Edappadi', 'Gangavalli', 'Mettur', 'Omalur', 'Salem', 'Salem South', 'Salem West', 'Sankari', 'Vazhapadi', 'Yercaud' // Salem
        // ... (would include all 200+ taluks in production) ...
    ];

    const villages = [
        'Adyar', 'Anna Nagar', 'Ashok Nagar', 'Besant Nagar', 'Chromepet', 'Egmore', 'Guindy', 'K.K. Nagar',
        'Kodambakkam', 'Mylapore', 'Nungambakkam', 'Pallavaram', 'Perambur', 'Royapettah', 'Saidapet', 'T. Nagar',
        'Tambaram', 'Thiruvanmiyur', 'Vadapalani', 'Velachery', 'Virugambakkam', 'Washermanpet', 'West Mambalam',
        'Ganapathy', 'Peelamedu', 'R.S. Puram', 'Singanallur', 'Ukkadam', 'Gandhipuram', 'Saravanampatti',
        'Anna Nagar (Madurai)', 'K.K. Nagar (Madurai)', 'Simmakkal', 'Tallakulam', 'TVS Nagar'
        // ... (Listing 18,213 villages is not feasible in a single file client-side variable. This is a representative subset.)
    ];

    // AI Logic - Categorize but don't show urgency to user
    useEffect(() => {
        if (formData.description.length > 5) { // Faster reaction
            const timer = setTimeout(() => {
                const desc = formData.description.toLowerCase();
                let category = 'General';
                let urgency = 'Low';

                if (desc.includes('urgent') || desc.includes('danger') || desc.includes('fire') || desc.includes('accident')) {
                    urgency = 'High';
                }

                // Strict Department Routing
                if (desc.includes('water') || desc.includes('pipe') || desc.includes('leak') || desc.includes('supply')) category = 'Water Supply Department';
                else if (desc.includes('road') || desc.includes('pothole') || desc.includes('street')) category = 'Roads & Infrastructure Department';
                else if (desc.includes('electric') || desc.includes('light') || desc.includes('power') || desc.includes('pole')) category = 'Electricity Board';
                else if (desc.includes('garbage') || desc.includes('trash') || desc.includes('bin') || desc.includes('clean')) category = 'Sanitation Department';
                else if (desc.includes('bus') || desc.includes('transport') || desc.includes('traffic')) category = 'Transport Department';
                else if (desc.includes('hospital') || desc.includes('doctor') || desc.includes('health')) category = 'Health Department';

                setAiAnalysis({ category, urgency });
                // Silently set the category in form data
                setFormData(prev => ({ ...prev, category }));
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [formData.description]);

    const handleSendOtp = () => {
        if (formData.mobile.length === 10) {
            setOtpSent(true);
            alert(`OTP Sent to ${formData.mobile}: 1234 (Mock)`);
        } else {
            alert('Please enter a valid 10-digit mobile number.');
        }
    };

    const handleVerifyOtp = () => {
        if (otp === '1234') {
            setVerified(true);
        } else {
            alert('Invalid OTP');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
        }, 1500);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setFormData({ ...formData, evidence: file });
    };

    const inputStyle = { width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', color: 'black', outline: 'none' };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)', zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
            <div className="glass" style={{
                width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto',
                borderRadius: '1.5rem', position: 'relative', background: 'white',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', zIndex: 10 }}>
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{t.title}</h2>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{t.subtitle}</p>
                    </div>
                    <button onClick={onClose} style={{ color: 'var(--color-text-muted)', fontSize: '1.5rem' }}>&times;</button>
                </div>

                <div style={{ padding: '2rem' }}>
                    {!submitted ? (
                        <form onSubmit={handleSubmit}>

                            {/* Section 1: Identity & Verification */}
                            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>{t.sec1}</h4>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{t.aadhar}</label>
                                    <input
                                        required type="text" maxLength="12" placeholder="12 Digit Aadhar No"
                                        style={inputStyle} value={formData.aadhar}
                                        onChange={(e) => setFormData({ ...formData, aadhar: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{t.mobile}</label>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <input
                                            required type="tel" maxLength="10" disabled={verified} placeholder="10 Digit Mobile"
                                            style={inputStyle} value={formData.mobile}
                                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                        />
                                        {!verified && (
                                            <button
                                                type="button" onClick={handleSendOtp} className="btn btn-primary"
                                                style={{ padding: '0 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                                            >
                                                {otpSent ? t.resend : t.getOtp}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {!verified && otpSent && (
                                <div style={{ marginBottom: '1.5rem', background: '#f0fdf4', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #bbf7d0' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#166534' }}>{t.enterOtp}</label>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <input
                                            type="text" placeholder="1234" style={{ ...inputStyle, width: '150px' }}
                                            value={otp} onChange={(e) => setOtp(e.target.value)}
                                        />
                                        <button
                                            type="button" onClick={handleVerifyOtp} className="btn"
                                            style={{ background: '#166534', color: 'white', padding: '0 1.5rem' }}
                                        >
                                            {t.verify}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {verified && (
                                <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-success)', fontSize: '0.9rem', fontWeight: '500' }}>
                                    <span>✓ {t.verified}</span>
                                </div>
                            )}

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{t.name}</label>
                                <input
                                    required type="text" placeholder="Name as per Aadhar" style={inputStyle}
                                    value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            {/* Section 2: Location Details (Searchable) */}
                            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>{t.sec2}</h4>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{t.district}</label>
                                    <SearchableSelect
                                        options={districts} value={formData.district} placeholder={t.district}
                                        onChange={(val) => setFormData({ ...formData, district: val })}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{t.taluk}</label>
                                    <SearchableSelect
                                        options={taluks} value={formData.taluk} placeholder={t.taluk}
                                        onChange={(val) => setFormData({ ...formData, taluk: val })}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{t.village}</label>
                                    <SearchableSelect
                                        options={villages} value={formData.village} placeholder={t.village}
                                        onChange={(val) => setFormData({ ...formData, village: val })}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{t.pincode}</label>
                                    <input
                                        required type="text" placeholder="6 Digit Pincode" maxLength="6" style={inputStyle}
                                        value={formData.pincode} onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Section 3: Grievance Details - Category REMOVED (AI Handles it) */}
                            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>{t.sec3}</h4>

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{t.desc}</label>
                                <div style={{ position: 'relative' }}>
                                    <textarea
                                        required placeholder={t.desc} rows="5"
                                        style={{ ...inputStyle, resize: 'none', transition: 'border-color 0.3s' }}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    ></textarea>

                                    <div style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
                                        <input type="file" id="evidence-upload" style={{ display: 'none' }} onChange={handleFileChange} />
                                        <label htmlFor="evidence-upload" title={t.evidence} style={{
                                            width: '2.5rem', height: '2.5rem',
                                            background: formData.evidence ? 'var(--color-success)' : 'rgba(0,0,0,0.1)',
                                            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid rgba(0,0,0,0.2)', transition: 'all 0.2s'
                                        }}>
                                            {formData.evidence ? '✓' : '+'}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* AI Results - Showing the auto-detected Department */}
                            {aiAnalysis && (
                                <div style={{ marginBottom: '2rem', background: '#f1f5f9', borderRadius: '0.75rem', padding: '1rem', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ fontSize: '1.5rem' }}>🤖</div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>Routing to:</p>
                                        <p style={{ margin: 0, fontWeight: '600', color: '#7c3aed' }}>{aiAnalysis.category}</p>
                                    </div>
                                </div>
                            )}
                            <button type="submit" disabled={!verified} className="btn btn-primary" style={{ width: '100%', opacity: verified ? 1 : 0.6, cursor: verified ? 'pointer' : 'not-allowed' }}>
                                {isSubmitting ? t.submitting : t.submit}
                            </button>
                            {!verified && <p style={{ fontSize: '0.8rem', color: '#ef4444', marginTop: '0.5rem', textAlign: 'center' }}>Please verify mobile number first.</p>}
                        </form>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                            <div style={{ width: '4rem', height: '4rem', background: 'var(--color-success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1.5rem auto' }}>✓</div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>{t.successTitle}</h3>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                                {t.successMsg}, {formData.name}.<br />
                                {t.idMsg} <strong>#GRV-2026-X892</strong>.
                            </p>
                            <button onClick={onClose} className="btn btn-outline">{t.close}</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// --- MAIN APP ---
function App() {
    const [view, setView] = useState('home');
    const [showGrievanceForm, setShowGrievanceForm] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [language, setLanguage] = useState('English');

    const handleNavigate = (page) => {
        if (page === 'help') setShowHelp(true);
        else if (page === 'auth-login') setView('auth-login');
        else {
            setView(page);
            showGrievanceForm(false);
            window.scrollTo(0, 0);
        }
    };

    const handleLogin = () => {
        setView('dashboard'); // Redirect to dashboard after login for now
    };

    useEffect(() => {
        const handler = () => setShowGrievanceForm(true);
        document.addEventListener('open-grievance', handler);
        return () => document.removeEventListener('open-grievance', handler);
    }, []);

    return (
        <div className="App">
            {view !== 'auth-login' && view !== 'dept-login' &&
                <Header onNavigate={handleNavigate} isScrolled={view === 'dashboard'} language={language} setLanguage={setLanguage} />
            }

            <main>
                {view === 'home' && (
                    <>
                        <Hero language={language} />
                        <Features language={language} />
                    </>
                )}
                {view === 'dashboard' && <Dashboard />}
                {view === 'auth-login' && <AuthorityLogin language={language} onLogin={handleLogin} />}
                {view === 'dept-login' && <DepartmentLogin onLogin={handleLogin} onBack={() => setView('home')} />}
            </main>
            {showGrievanceForm && <GrievanceAIForm onClose={() => setShowGrievanceForm(false)} language={language} />}
            {showHelp && <HelpModal onClose={() => setShowHelp(false)} language={language} />}
        </div>
    );
}

const rootString = ReactDOM.createRoot(document.getElementById('root'));
rootString.render(<App />);