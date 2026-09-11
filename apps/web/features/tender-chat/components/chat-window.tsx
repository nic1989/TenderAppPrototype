import { useRouter } from "next/navigation"
import { ChatInput } from "./chat-input"
import { useCallback, useEffect, useState } from "react"
import { useTenderChat } from "../hooks/useTenderChat"

interface ChatWindowProps {
    summary: string
    selectedId: string
}

export default function ChatWindow({summary, selectedId}: ChatWindowProps) {
    const router = useRouter()

    const [chatText, setChatText] = useState('')
    const [aiChats, setAIChats] = useState<string[]>([]);
    const [question, setQuestion] = useState({question: ''})
    const {data, isLoading, isError} = useTenderChat(selectedId, question);

    const handleSubmit = useCallback((e: any) => {
        e.preventDefault();
        if (!chatText.trim()) return;
        const data = {question: chatText.trim()};
        setQuestion(data)
        setAIChats(prev => [...prev, chatText.trim()])
        setChatText('');
    }, [chatText])

    useEffect(() => {
        if (!data) return;
        setAIChats(prev => [...prev, data.answer])
        setQuestion({question: ''})
    }, [data])

    if (isError) {
        setQuestion({question: ''})
        setAIChats(prev => [...prev, "I couldn't find that information in the tender."])
    }

    return (
        <div className={`w-full ${summary ? 'border' : ''} border-[#E5E5E5] rounded-2xl bg-white mt-4`}>
            {summary ?
                <>
                    <div className="flex sticky top-0 bg-white w-auto p-4 py-2 justify-between items-center border-b rounded-t-xl border-neutral/200">
                        <div className="flex items-center gap-2">
                            <span className="text-neutral-700 font-medium leading-5">AI Summary</span>
                        </div>
                    </div>
                    <div className="h-40 p-4 overflow-y-auto">
                        <div className="flex items-center gap-[15px] self-stretch mb-2">
                            {summary}
                        </div>
                    </div>
                    <div className="border-t p-4">
                        <ChatInput
                            isLoading={isLoading}
                            chatText={chatText}
                            setChatText={setChatText}
                            handleSubmit={handleSubmit}
                            aiChats={aiChats} />
                    </div>
                </>
            :
                <div className="p-4 flex justify-center font-medium">Tender is not analyzed yet. Please<button className="text-[#6366f1] cursor-pointer" onClick={() => router.push('/analysis')}>&nbsp;analysis&nbsp;</button> this tender to start the chat.</div>
            }
        </div>
    )
}