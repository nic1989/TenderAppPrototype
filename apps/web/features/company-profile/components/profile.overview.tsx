'use client'

import ProfileForm from "./profile-form";
import { CompanyProfile } from "../types/profile.type";

interface ProfileDataProps {
    profileData?: CompanyProfile
}

export default function ProfileOverview({profileData}: ProfileDataProps) {
    console.log('overview me', profileData)
    return (
        <div className="mt-6 p-4">
            <ProfileForm profileData={profileData} />
        </div>
    )
}