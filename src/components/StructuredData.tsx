import { useEffect } from 'react';

interface StructuredDataProps {
  data: Record<string, any>;
}

const StructuredData = ({ data }: StructuredDataProps) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    script.id = `structured-data-${data['@type']?.toLowerCase() || 'generic'}`;
    
    // Remove existing same-type script
    const existing = document.getElementById(script.id);
    if (existing) existing.remove();
    
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, [data]);

  return null;
};

export default StructuredData;
