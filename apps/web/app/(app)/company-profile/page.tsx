'use client'

import AppBreadcrumbs from "@/components/layout/app-breadcrumbs"
import { LoadingScreen } from "@/features/auth/components/loading-screen";
import ProfileHeader from "@/features/company-profile/components/profile-header"
import { useCompanyProfile } from "@/features/company-profile/hooks/useCompanyProfile"
import ProfileOverview from "@/features/company-profile/components/profile.overview"
import { toast } from "sonner";

export default function CompanyProfilePage() {
    const {data: profileData, isLoading, isError, error} = useCompanyProfile();

    if (isLoading) {
        return <LoadingScreen />
    }

    if (isError) {
        return toast.error(error.message)
    }
    return(
        <div className="w-full">
            <AppBreadcrumbs head="Dashboard" controller="Company Profile" />
            <ProfileHeader />
            <ProfileOverview profileData={profileData} />
        </div>
    )
}