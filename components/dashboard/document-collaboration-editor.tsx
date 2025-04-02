"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  LinkIcon,
  Image,
  FileText,
} from "lucide-react"

export default function DocumentCollaborationEditor() {
  const [content, setContent] = useState(`# SERVICE AGREEMENT

This Service Agreement (the "Agreement") is entered into as of [Date], by and between:

**Party 1:** [Party 1 Name], with an address at [Party 1 Address] ("Client")

**Party 2:** [Party 2 Name], with an address at [Party 2 Address] ("Service Provider")

WHEREAS, Client wishes to engage Service Provider to provide certain services, and Service Provider is willing to provide such services to Client;

NOW, THEREFORE, in consideration of the mutual covenants and agreements herein contained, the parties hereto agree as follows:

## 1. Services
Service Provider shall provide to Client the services (the "Services") described in Exhibit A attached hereto.

## 2. Term
This Agreement shall commence on [Start Date] and shall continue until [End Date], unless earlier terminated as provided herein.

## 3. Compensation
In consideration for the Services, Client shall pay Service Provider the amounts set forth in Exhibit B attached hereto.

## 4. Independent Contractor Relationship
Service Provider is an independent contractor, and nothing contained in this Agreement shall be construed to create a partnership, joint venture, agency, or employment relationship between Client and Service Provider.

## 5. Confidentiality
Service Provider acknowledges that during the engagement, Service Provider may have access to and become acquainted with confidential information belonging to Client. Service Provider agrees not to disclose any such information without Client's prior written consent.`)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b p-4">
        <Button variant="ghost" size="sm">
          <Bold className="h-4 w-4" />
          <span className="sr-only">Bold</span>
        </Button>
        <Button variant="ghost" size="sm">
          <Italic className="h-4 w-4" />
          <span className="sr-only">Italic</span>
        </Button>
        <Button variant="ghost" size="sm">
          <List className="h-4 w-4" />
          <span className="sr-only">Bullet List</span>
        </Button>
        <Button variant="ghost" size="sm">
          <ListOrdered className="h-4 w-4" />
          <span className="sr-only">Numbered List</span>
        </Button>
        <Button variant="ghost" size="sm">
          <AlignLeft className="h-4 w-4" />
          <span className="sr-only">Align Left</span>
        </Button>
        <Button variant="ghost" size="sm">
          <AlignCenter className="h-4 w-4" />
          <span className="sr-only">Align Center</span>
        </Button>
        <Button variant="ghost" size="sm">
          <AlignRight className="h-4 w-4" />
          <span className="sr-only">Align Right</span>
        </Button>
        <Button variant="ghost" size="sm">
          <LinkIcon className="h-4 w-4" />
          <span className="sr-only">Add Link</span>
        </Button>
        <Button variant="ghost" size="sm">
          <Image className="h-4 w-4" />
          <span className="sr-only">Add Image</span>
        </Button>
        <Button variant="ghost" size="sm">
          <FileText className="h-4 w-4" />
          <span className="sr-only">Add Template</span>
        </Button>
      </div>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[600px] font-mono text-sm p-4 border-0 focus-visible:ring-0 resize-none"
      />
    </div>
  )
}

