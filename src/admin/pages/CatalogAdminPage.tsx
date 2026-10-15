import { ExternalLinkIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@admincn/components/ui/card';
import { Button } from '@admincn/components/ui/button';

import { FEATURED_COURSES } from '../../data/designSystemData';

export function CatalogAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Catalog cursuri</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Previzualizare cursuri acreditate disponibile în demo. Gestionarea completă a cursurilor
          (preț, program, materiale) se face în aplicația de producție.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {FEATURED_COURSES.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle className="text-base">{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3 text-sm">
              <p>{course.description.slice(0, 160)}…</p>
              <div className="text-foreground flex flex-wrap gap-2 text-xs font-medium">
                <span className="bg-primary/10 rounded-sm px-2 py-1">{course.durationHours} ore</span>
                <span className="bg-primary/10 rounded-sm px-2 py-1">{course.category}</span>
                <span className="bg-primary/10 rounded-sm px-2 py-1">{course.priceLei} lei</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" render={<a href="https://www.cursurispecializare.ro" target="_blank" rel="noreferrer" />}>
        <ExternalLinkIcon className="size-4" />
        Deschide site-ul public
      </Button>
    </div>
  );
}
