'use client'

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useCallback } from "react"

interface TenderDataProps {
    label: string
    value: string
}

interface TenderItemsProps {
    tenders: TenderDataProps[]
    heading?: string
    setSelectedId: Function
}

export default function ChatHeader({tenders, heading, setSelectedId}: TenderItemsProps) {
    const handleTenderChange = useCallback((id: string) => {
        setSelectedId(id)
    }, []);

    return (
        <div className="border rounded-2xl p-4 mt-4">
            <form>
                <FieldGroup>
                    <FieldSet>
                        {heading && (
                            <div className="text-lg font-medium">{heading}</div>
                        )}
                        <FieldGroup>
                            <Field orientation="horizontal">
                                <FieldLabel>
                                    <span>Tenders</span>
                                    <Select onValueChange={handleTenderChange}>
                                        <SelectTrigger className="p-2">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                            {tenders?.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                {item.label}
                                                </SelectItem>
                                            ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FieldLabel>
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                </FieldGroup>
            </form>
        </div>
    )
}