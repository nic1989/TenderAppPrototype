export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US')
}

export const getHeading = (pathname: string) => {
    const path = pathname.split('/');
    if (path?.[1]?.includes('-')) {
        const heading = path[1]?.split('-');
        return capitalizeString(heading[0])+' '+capitalizeString(heading[1])
    }
    return capitalizeString(path[1]) || ''
}

export const capitalizeString = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
}