import React from 'react';
import { QuizLayer, QuizOption } from '../types';
import { TextLayer } from './layers/TextLayer';
import { ImageLayer } from './layers/ImageLayer';
import { OptionsLayer } from './layers/OptionsLayer';
import { AlertLayer } from './layers/AlertLayer';
import { ButtonLayer } from './layers/ButtonLayer';
import { LoadingLayer } from './layers/LoadingLayer';
import { CarouselLayer } from './layers/CarouselLayer';
import { ChartLayer } from './layers/ChartLayer';
import { ArgumentsLayer } from './layers/ArgumentsLayer';
import { QuotesLayer } from './layers/QuotesLayer';
import { PriceLayer } from './layers/PriceLayer';
import { VideoLayer } from './layers/VideoLayer';

interface LayerRendererProps {
  layer: QuizLayer;
  onSelectOption: (option: QuizOption) => void;
  onContinueMultiple?: (options: QuizOption[]) => void;
  onButtonClick: (destination?: string) => void;
  onLoadingFinish: (destination?: string) => void;
  themeColor?: string;
}

export const LayerRenderer: React.FC<LayerRendererProps> = ({
  layer,
  onSelectOption,
  onContinueMultiple,
  onButtonClick,
  onLoadingFinish,
  themeColor = '#3b82f6',
}) => {
  switch (layer.type) {
    case 'text':
      return <TextLayer layer={layer} />;

    case 'image':
      return <ImageLayer layer={layer} />;

    case 'options':
      return (
        <OptionsLayer
          layer={layer}
          onSelectOption={onSelectOption}
          onContinueMultiple={onContinueMultiple}
          themeColor={themeColor}
        />
      );

    case 'alert':
      return <AlertLayer layer={layer} />;

    case 'button':
      return <ButtonLayer layer={layer} onClick={onButtonClick} themeColor={themeColor} />;

    case 'loading':
      return <LoadingLayer layer={layer} onFinish={onLoadingFinish} themeColor={themeColor} />;

    case 'carousel':
      return <CarouselLayer layer={layer} />;

    case 'charts':
      return <ChartLayer layer={layer} />;

    case 'arguments':
      return <ArgumentsLayer layer={layer} />;

    case 'quotes':
      return <QuotesLayer layer={layer} />;

    case 'price':
      return <PriceLayer layer={layer} themeColor={themeColor} />;

    case 'video':
      return <VideoLayer layer={layer} />;

    case 'clear': {
      const clearVal = layer.content?.clear || 'h-4';
      // Normalize clear height class
      let heightStyle: React.CSSProperties = { height: '1rem' };
      if (clearVal.includes('2rem')) heightStyle = { height: '2rem' };
      if (clearVal.includes('3rem')) heightStyle = { height: '3rem' };
      if (clearVal.includes('0.5rem')) heightStyle = { height: '0.5rem' };
      return <div style={heightStyle} aria-hidden="true" />;
    }

    default:
      return null;
  }
};
