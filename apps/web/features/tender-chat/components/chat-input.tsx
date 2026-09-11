"use client"

import { useEffect, useRef } from "react";
import { ArrowUpIcon, Bot, User } from "lucide-react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { InputGroup, InputGroupButton } from "@/components/ui/input-group"

interface chatQuestionProps {
    isLoading: boolean;
    chatText: string;
    setChatText: (text: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    aiChats: string[]
}

export function ChatInput({isLoading, chatText, setChatText, handleSubmit, aiChats}: chatQuestionProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isLoading) {
            scrollToBottom();
        }
    }, [aiChats, isLoading]);

  return (
    <div className="relative flex flex-col gap-4">
        <Card className="mx-auto w-full max-w-lg gap-0">
            <CardHeader className="gap-1 border-b">
            <CardTitle>Ask Questions</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0 mt-2">
                <div className="h-70 overflow-y-auto">
                    {aiChats?.map((item, index) => {
                        return (
                            <div key={index}>
                                {index % 2 !== 0 ? (
                                    <div className="flex justify-start ml-2 mr-2">
                                        <div className="flex justify-between">
                                            <Bot size={16} />
                                            <span className="ml-1 text-muted-foreground">AI</span>
                                        </div>
                                        <div className="border rounded-[10px] p-2 text-right m-2 mr-0 bg-sky-200">{item}</div>
                                    </div>
                                ) : 
                                    <div className="flex justify-end mr-2 ml-2">
                                        <div className="flex justify-between ">
                                            <User size={16} />
                                            <span className="ml-1 text-muted-foreground">You</span>
                                        </div>
                                        <div className="border rounded-[10px] p-2 text-right m-2 mr-0 bg-gray-100">{item}</div>
                                    </div>
                                }
                            </div>
                        )
                    })}
                    {aiChats.length === 0 && (
                        <div className="flex flex-col p-6">
                            <span className="flex font-medium text-base mb-4"><Bot /> <span className="ml-2">AI Tender Assistant</span></span>
                            <span className="mb-4">Ask me anything about this tender.</span>
                            <span className="text-muted-foreground">
                                Examples:
                                <ul className="list-disc list-inside space-y-2">
                                    <li>What is the EMD?</li>
                                    <li>Summarize the tender.</li>
                                    <li>List eligibility criteria.</li>
                                    <li>Explain the technical requirements.</li>
                                </ul>
                            </span>
                        </div>
                    )}
                    {isLoading && (
                        <div className="flex items-center space-x-2 p-2 text-gray-400 text-sm animate-pulse">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            <span>AI is thinking...</span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="w-full"
            >
                <InputGroup className="h-12">
                <div className="flex justify-between h-14 w-full px-3 py-2.5">
                    <input
                        className="focus:outline-none px-0 p-4"
                        placeholder="Ask Question"
                        value={chatText}
                        onChange={(e) => setChatText(e.target.value)} />
                    <InputGroupButton
                    type="submit"
                    variant="default"
                    size="icon-sm"
                    disabled={isLoading}
                    className="ml-auto cursor-pointer"
                    >
                    <ArrowUpIcon />
                    <span className="sr-only">Send</span>
                    </InputGroupButton>
                </div>
                </InputGroup>
            </form>
            </CardFooter>
        </Card>
    </div>
  )
}
