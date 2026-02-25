
import React from 'react';
import { Facebook, Twitter, Linkedin, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ShareButtonsProps {
  title: string;
  url?: string;
}

const ShareButtons = ({ title, url }: ShareButtonsProps) => {
  const shareUrl = url || window.location.href;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Lien copié !");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-1">Partager :</span>
      <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Partager sur Facebook">
          <Facebook className="w-4 h-4" />
        </a>
      </Button>
      <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
        <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" aria-label="Partager sur Twitter">
          <Twitter className="w-4 h-4" />
        </a>
      </Button>
      <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Partager sur LinkedIn">
          <Linkedin className="w-4 h-4" />
        </a>
      </Button>
      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={copyLink} aria-label="Copier le lien">
        <Link2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ShareButtons;
