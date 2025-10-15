'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Religion } from '@/types/religion';

interface ReligionDetailPanelProps {
  religion: Religion | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ReligionDetailPanel({
  religion,
  isOpen,
  onClose,
}: ReligionDetailPanelProps) {
  if (!religion) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <div className="flex items-start gap-4">
            {religion.iconUrl ? (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                {religion.name.charAt(0)}
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-3xl">
                {religion.name.charAt(0)}
              </div>
            )}
            <div className="flex-1">
              <SheetTitle className="text-2xl">{religion.name}</SheetTitle>
              {religion.autonym && religion.autonym !== religion.name && (
                <p className="text-sm text-muted-foreground mt-1">
                  {religion.autonym}
                </p>
              )}
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{religion.category}</Badge>
            {religion.family && (
              <Badge variant="outline">Famille: {religion.family}</Badge>
            )}
            <Badge variant="outline">{religion.status}</Badge>
          </div>

          {/* Informations temporelles */}
          {religion.foundedYear && (
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold text-sm mb-2">📅 Fondation</h4>
                <p className="text-sm text-muted-foreground">
                  {religion.foundedYear > 0
                    ? `${religion.foundedYear} apr. J.-C.`
                    : `${Math.abs(religion.foundedYear)} av. J.-C.`}
                  {religion.foundedYearEnd && ` - ${religion.foundedYearEnd}`}
                  {religion.foundedCentury &&
                    ` (${religion.foundedCentury})`}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Informations géographiques */}
          {religion.foundedPlace && (
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold text-sm mb-2">📍 Lieu d'origine</h4>
                <p className="text-sm text-muted-foreground">
                  {religion.foundedPlace}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Démographie */}
          {religion.followers && (
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold text-sm mb-2">👥 Pratiquants</h4>
                <p className="text-2xl font-bold">
                  {(Number(religion.followers) / 1000000).toFixed(1)}M
                </p>
                {religion.followersYear && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Estimation {religion.followersYear}
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Identifiants externes */}
          {religion.wikidataId && (
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold text-sm mb-2">🔗 Liens externes</h4>
                <a
                  href={`https://www.wikidata.org/wiki/${religion.wikidataId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Wikidata: {religion.wikidataId}
                </a>
              </CardContent>
            </Card>
          )}

          {/* Métadonnées */}
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold text-sm mb-2">ℹ️ Métadonnées</h4>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>ID: {religion.id}</p>
                <p>Slug: {religion.slug}</p>
                {religion.createdAt && (
                  <p>
                    Créé le:{' '}
                    {new Date(religion.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}

