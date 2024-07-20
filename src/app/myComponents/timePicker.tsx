"use client"

import React, { useEffect, useState } from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Props {
  type: "start" | "end",
  addTime: (day: string, type: string, hour: string, minute: string, period: string) => void
  day: string,
  hour?: string,
  minute?: string,
  period?: string

}



const TimePicker = ({ type, addTime, day, hour = "", minute = "", period = "" }: Props) => {
  const [selectedHour, setSelectedHour] = useState<string | undefined>(hour)
  const [selectedMinute, setSelectedMinute] = useState<string | undefined>(minute)
  const [selectedPeriod, setSelectedPeriod] = useState<string | undefined>(period)

  const formatTime = () => {
    let period = selectedPeriod === "pm" ? "PM" : "AM"
    return `${selectedHour}:${selectedMinute} ${period}`
  }

  useEffect(() => {

    if (selectedHour && selectedMinute && selectedPeriod) {

      addTime(day, type, selectedHour, selectedMinute, selectedPeriod)
    }

  }, [selectedHour, selectedMinute, selectedPeriod])
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
          <ClockIcon className="mr-1 h-4 w-4 -translate-x-1" />
          {selectedHour && selectedMinute && selectedPeriod ? formatTime() : `Pick ${type === "start" ? "a" : "an"} ${type} time`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="grid gap-2 p-4">
          <div className="grid grid-cols-3 gap-2">
            <Select value={selectedHour} onValueChange={(value) => setSelectedHour(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Hour" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="9">9</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="11">11</SelectItem>
                <SelectItem value="12">12</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedMinute} onValueChange={(value) => setSelectedMinute(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Minute" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="00">00</SelectItem>
                <SelectItem value="05">05</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="35">35</SelectItem>
                <SelectItem value="40">40</SelectItem>
                <SelectItem value="45">45</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="55">55</SelectItem>
              </SelectContent>
            </Select>
            <RadioGroup value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value)}>
              <Label htmlFor="am" className="flex items-center justify-center gap-2 cursor-pointer">
                <RadioGroupItem id="am" value="am" />
                AM
              </Label>
              <Label htmlFor="pm" className="flex items-center justify-center gap-2 cursor-pointer">
                <RadioGroupItem id="pm" value="pm" />
                PM
              </Label>
            </RadioGroup>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default TimePicker

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}


