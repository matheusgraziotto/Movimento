import React, { useMemo } from 'react';

interface HtmlContentProps {
  html?: string | null;
  className?: string;
}

export const HtmlContent: React.FC<HtmlContentProps> = ({ html, className = '' }) => {
  const sanitizedHtml = useMemo(() => {
    if (!html) return '';
    // Replace non-breaking spaces (&nbsp; and unicode \u00A0) with standard spaces to allow natural line wrapping on mobile devices
    return html.replace(/&nbsp;/gi, ' ').replace(/\u00a0/g, ' ');
  }, [html]);

  if (!html) return null;

  return (
    <div
      className={`prose max-w-none break-words min-w-0 leading-relaxed overflow-wrap-anywhere ${className}`}
      style={{ overflowWrap: 'anywhere', wordBreak: 'normal' }}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

