import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Award, Edit, Save, X, Plus, Trash2 } from 'lucide-react';

export default function UserProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [userProfile, setUserProfile] = useState({
    personalInfo: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      title: 'Senior Frontend Developer',
      bio: 'Passionate frontend developer with 5+ years of experience creating user-friendly web applications. Skilled in React, TypeScript, and modern web technologies.',
      avatar: null
    },
    skills: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'JavaScript', level: 95 },
      { name: 'CSS/SCSS', level: 80 },
      { name: 'Node.js', level: 75 },
      { name: 'Python', level: 70 }
    ],
    experience: [
      {
        id: 1,
        company: 'TechCorp Inc.',
        position: 'Senior Frontend Developer',
        duration: '2022 - Present',
        description: 'Led development of customer-facing web applications using React and TypeScript. Improved application performance by 40% and mentored junior developers.'
      },
      {
        id: 2,
        company: 'StartupXYZ',
        position: 'Frontend Developer',
        duration: '2020 - 2022',
        description: 'Developed responsive web applications and collaborated with design team to implement pixel-perfect UI components.'
      }
    ],
    education: [
      {
        id: 1,
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science in Computer Science',
        year: '2020',
        gpa: '3.8/4.0'
      }
    ],
    certifications: [
      { name: 'AWS Certified Developer', issuer: 'Amazon Web Services', year: '2023' },
      { name: 'React Professional Certificate', issuer: 'Meta', year: '2022' }
    ]
  });

  const [editForm, setEditForm] = useState({ ...userProfile });

  const handleSave = () => {
    setUserProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({ ...userProfile });
    setIsEditing(false);
  };

  const addSkill = () => {
    setEditForm({
      ...editForm,
      skills: [...editForm.skills, { name: '', level: 50 }]
    });
  };

  const removeSkill = (index) => {
    setEditForm({
      ...editForm,
      skills: editForm.skills.filter((_, i) => i !== index)
    });
  };

  const updateSkill = (index, field, value) => {
    const updatedSkills = [...editForm.skills];
    updatedSkills[index][field] = value;
    setEditForm({
      ...editForm,
      skills: updatedSkills
    });
  };

  const TabButton = ({ id, label, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-4 py-2 font-medium rounded-lg transition-all duration-300 ${
        active 
          ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30' 
          : 'text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 hover:shadow-md'
      }`}
    >
      {label}
    </button>
  );

  const SkillBar = ({ skill, level, editable = false, index }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        {editable ? (
          <div className="flex items-center gap-2 flex-1">
            <input
              type="text"
              value={skill}
              onChange={(e) => updateSkill(index, 'name', e.target.value)}
              className="border border-purple-200 rounded px-2 py-1 flex-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              placeholder="Skill name"
            />
            <input
              type="number"
              value={level}
              onChange={(e) => updateSkill(index, 'level', parseInt(e.target.value))}
              className="border border-purple-200 rounded px-2 py-1 w-16 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              min="0"
              max="100"
            />
            <button
              onClick={() => removeSkill(index)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ) : (
          <>
            <span className="font-medium">{skill}</span>
            <span className="text-sm text-purple-500">{level}%</span>
          </>
        )}
      </div>
      <div className="w-full bg-gradient-to-r from-purple-100 to-purple-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300 shadow-sm"
          style={{width: `${level}% `}}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-white/20 to-purple-200/30 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/20">
                <User size={40} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {userProfile.personalInfo.name}
                </h1>
                <p className="text-xl text-purple-100 mt-1">
                  {userProfile.personalInfo.title}
                </p>
                <div className="flex items-center gap-4 mt-3 text-purple-200">
                  <div className="flex items-center gap-1">
                    <Mail size={16} />
                    <span>{userProfile.personalInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone size={16} />
                    <span>{userProfile.personalInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{userProfile.personalInfo.location}</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-purple-100/30 backdrop-blur-sm text-white rounded-lg hover:from-white/30 hover:to-purple-100/40 transition-all duration-300 border border-white/20"
            >
              <Edit size={16} />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8">
          <TabButton
            id="overview"
            label="Overview"
            active={activeTab === 'overview'}
            onClick={setActiveTab}
          />
          <TabButton
            id="experience"
            label="Experience"
            active={activeTab === 'experience'}
            onClick={setActiveTab}
          />
          <TabButton
            id="education"
            label="Education"
            active={activeTab === 'education'}
            onClick={setActiveTab}
          />
          <TabButton
            id="skills"
            label="Skills"
            active={activeTab === 'skills'}
            onClick={setActiveTab}
          />
        </div>

        {/* Edit Mode Actions */}
        {isEditing && (
          <div className="flex gap-2 mb-6">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg shadow-green-500/30"
            >
              <Save size={16} />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg shadow-gray-500/30"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        )}

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-purple-100 p-6">
                <h2 className="text-xl font-semibold mb-4 text-purple-800">About Me</h2>
                {isEditing ? (
                  <textarea
                    value={editForm.personalInfo.bio}
                    onChange={(e) => setEditForm({
                      ...editForm,
                      personalInfo: { ...editForm.personalInfo, bio: e.target.value }
                    })}
                    className="w-full h-32 border border-purple-200 rounded-lg p-3 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">
                    {userProfile.personalInfo.bio}
                  </p>
                )}
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-6">
                {userProfile.experience.map((exp) => (
                  <div key={exp.id} className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-purple-100 p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                        <Briefcase size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-purple-800">{exp.position}</h3>
                        <p className="text-purple-600 font-medium">{exp.company}</p>
                        <p className="text-purple-500 text-sm mb-3">{exp.duration}</p>
                        <p className="text-gray-700">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-6">
                {userProfile.education.map((edu) => (
                  <div key={edu.id} className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-purple-100 p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                        <GraduationCap size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-purple-800">{edu.degree}</h3>
                        <p className="text-purple-600 font-medium">{edu.institution}</p>
                        <p className="text-purple-500 text-sm">Class of {edu.year}</p>
                        <p className="text-gray-700 mt-2">GPA: {edu.gpa}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-purple-100 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-purple-800">Technical Skills</h2>
                  {isEditing && (
                    <button
                      onClick={addSkill}
                      className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-purple-500/30"
                    >
                      <Plus size={16} />
                      Add Skill
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(isEditing ? editForm.skills : userProfile.skills).map((skill, index) => (
                    <SkillBar
                      key={index}
                      skill={skill.name}
                      level={skill.level}
                      editable={isEditing}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-purple-100 p-6">
              <h3 className="text-lg font-semibold mb-4 text-purple-800">Profile Completion</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Profile Strength</span>
                  <span className="font-medium text-purple-600">85%</span>
                </div>
                <div className="w-full bg-gradient-to-r from-purple-100 to-purple-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full shadow-sm" style={{ width: '85%' }}></div>
                </div>
                <p className="text-sm text-gray-600">
                  Add more skills and certifications to improve your profile visibility.
                </p>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-purple-100 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-purple-800">
                <Award size={20} className="text-purple-600" />
                Certifications
              </h3>
              <div className="space-y-3">
                {userProfile.certifications.map((cert, index) => (
                  <div key={index} className="border-l-4 border-purple-400 pl-4 bg-purple-50/50 rounded-r-lg p-3">
                    <h4 className="font-medium text-purple-800">{cert.name}</h4>
                    <p className="text-sm text-purple-600">{cert.issuer}</p>
                    <p className="text-xs text-purple-500">{cert.year}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-purple-100 p-6">
              <h3 className="text-lg font-semibold mb-4 text-purple-800">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 transition-all duration-300 text-purple-700 hover:text-purple-800">
                  Download Resume
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 transition-all duration-300 text-purple-700 hover:text-purple-800">
                  Share Profile
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 transition-all duration-300 text-purple-700 hover:text-purple-800">
                  Privacy Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}