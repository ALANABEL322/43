import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'closed';
  response?: string;
  createdAt: string;
}

export default function UserSupportPage() {
  const [tickets] = useState<Ticket[]>([
    {
      id: '1',
      subject: 'Problema con la creación de proyecto',
      description: 'No puedo crear un nuevo proyecto...',
      status: 'open',
      createdAt: new Date().toISOString(),
    },
  ]);

  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    priority: 'medium',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nuevo ticket:', newTicket);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Crear Nuevo Ticket de Soporte</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Input
                  id="subject"
                  value={newTicket.subject}
                  onChange={(e) =>
                    setNewTicket((prev) => ({ ...prev, subject: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Prioridad</Label>
                <Select
                  value={newTicket.priority}
                  onValueChange={(value) =>
                    setNewTicket((prev) => ({ ...prev, priority: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={newTicket.description}
                  onChange={(e) =>
                    setNewTicket((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="min-h-[100px]"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Enviar Ticket
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Mis Tickets</h2>
          {tickets.map((ticket) => (
            <Card key={ticket.id}>
              <CardHeader>
                <CardTitle className="text-lg">{ticket.subject}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Estado:{' '}
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          ticket.status === 'open'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Creado: {new Date(ticket.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <p className="text-sm">{ticket.description}</p>

                  {ticket.response && (
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm font-medium">Respuesta:</p>
                      <p className="text-sm text-gray-600">{ticket.response}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
