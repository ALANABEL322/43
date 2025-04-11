import { useState } from "react"
import { useSupportStore } from "../../store/supportStore"
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { toastStyles } from '../ui/sonner'
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '../ui/alert-dialog'

export default function SupportAdmin() {
  const { messages, addAdminResponse, deleteMessage } = useSupportStore()
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null)
  const [response, setResponse] = useState("")
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [messageToDelete, setMessageToDelete] = useState<number | null>(null)

  const handleResponse = (messageId: number) => {
    if (response.trim()) {
      addAdminResponse(messageId, response)
      setResponse("")
      setSelectedMessage(null)
      toast.success('Response sent successfully!', {
        className: toastStyles.adminResponse.background,
        duration: 5000,
      })
    }
  }

  const handleDeleteMessage = (messageId: number) => {
    setOpenDeleteDialog(true)
    setMessageToDelete(messageId)
  }

  const confirmDelete = () => {
    if (messageToDelete !== null) {
      deleteMessage(messageToDelete)
      toast.success('Message deleted successfully!', {
        className: toastStyles.adminResponse.background,
        duration: 5000,
      })
      setOpenDeleteDialog(false)
      setMessageToDelete(null)
    }
  }

  const cancelDelete = () => {
    setOpenDeleteDialog(false)
    setMessageToDelete(null)
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg min-h-screen mt-20 flex-1 lg:ml-[17rem] 2xl:ml-[30rem]">
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Support Panel</h1>
      
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer relative"
            onClick={() => setSelectedMessage(message.id)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteMessage(message.id)
              }}
              className="absolute mt-2 top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              title="Delete message"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-800">User Message</h3>
                <p className="text-sm text-gray-500">
                  {new Date(message.timestamp).toLocaleString()}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs mr-6 mt-2 ${
                message.adminResponse 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {message.adminResponse ? 'Responded' : 'Pending'}
              </span>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">Message Content:</h4>
                <p className="text-gray-600">{message.userMessage}</p>
              </div>
              {message.adminResponse && (
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-2">Admin Response:</h4>
                  <p className="text-gray-600">{message.adminResponse}</p>
                </div>
              )}
              {!message.adminResponse && selectedMessage === message.id && (
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-2">Write Response:</h4>
                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows={4}
                  />
                  <button
                    onClick={() => handleResponse(message.id)}
                    className="mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
                  >
                    Send Response
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
