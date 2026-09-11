import { House } from 'lucide-react';
import Link from 'next/link';
import { useCallback } from 'react';

interface BreadcrumbProps {
    head: string
    controller?: string
    view?: string
}

export default function AppBreadcrumbs({head = 'Dashboard', controller = '', view = ''}: BreadcrumbProps) {
    const getHeadHtml = useCallback((head: string, name: string) => {
        if (name === '') return <span className="hover:text-gray-900 ml-2">{head}</span>
        if (name !== '') return <Link href={'/dashboard'} className="hover:text-gray-900 ml-2">{head}</Link>
    }, [])

    const getNameHtml = useCallback((name: string, view: string) => {
        if (view === '') return <span className="hover:text-gray-900">{name}</span>
        if (view !== '') return <Link href={`/${name.toLowerCase()}`} className="hover:text-gray-900 ml-2">{name}</Link>
    }, [])
    return (
        <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 text-sm text-gray-500">
                <li className="inline-flex items-center">
                    <House size={16} />
                    {getHeadHtml(head, controller)}
                </li>
                {controller && (
                    <li className="flex items-center">
                        <span className="mx-2 text-gray-400">/</span>
                        {getNameHtml(controller, view)}
                    </li>
                )}
                {view && (
                    <li className="flex items-center" aria-current="page">
                        <span className="mx-2 text-gray-400">/</span>
                        <span className="text-gray-900 font-medium">{view}</span>
                    </li>
                )}
            </ol>
        </nav>
    )
}