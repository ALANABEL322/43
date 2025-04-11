import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Ticket {
  id: string;
  user: string;
  subject: string;
  status: 'open' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export default function AdminSupportPage() {
  const [tickets] = useState<Ticket[]>([
    {
      id: '1',
      user: 'John Doe',
      subject: 'Problema con la creación de proyecto',
      status: 'open',
      priority: 'high',
      createdAt: new Date().toISOString(),
    },
  ]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Panel de Soporte</h1>

      <div className="grid gap-6">
        {tickets.map((ticket) => (
          <Card key={ticket.id}>
            <CardHeader>
              <CardTitle className="text-lg">
                {ticket.subject}
                <span
                  className={`ml-2 inline-block px-2 py-1 text-xs rounded-full ${
                    ticket.priority === 'high'
                      ? 'bg-red-100 text-red-800'
                      : ticket.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {ticket.priority}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Usuario: {ticket.user}</p>
                  <p className="text-sm text-gray-500">
                    Creado: {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <Textarea
                  placeholder="Escribe una respuesta..."
                  className="min-h-[100px]"
                />

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cerrar Ticket</Button>
                  <Button>Responder</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
