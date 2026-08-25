export interface QuizDesign {
  logo?: { type: string; src?: string; [key: string]: unknown };
  themeColor: string;
  contentColor: string;
  titleColor: string;
  backgroundColor: string;
  featuredFont: string;
  contentFont: string;
  titleSize?: number;
  contentSize?: number;
  rounded?: string;
  elementSize?: string;
  container?: string;
  gap?: string;
  header?: {
    progress?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface QuizOption {
  id: string | number;
  label?: string;
  value?: string;
  score?: number;
  destination?: string;
  image?: {
    type?: string;
    src?: string | null;
    width?: number;
    height?: number;
    [key: string]: unknown;
  };
  chosen?: boolean;
  selected?: boolean;
  [key: string]: unknown;
}

export interface QuizQuote {
  id: string | number;
  text: string;
  name: string;
  activity?: string;
  rate?: number;
  image?: {
    type?: string;
    src: string;
    width?: number;
    height?: number;
    [key: string]: unknown;
  };
  chosen?: boolean;
  selected?: boolean;
  [key: string]: unknown;
}

export interface CarouselItem {
  id: string | number;
  image?: {
    src: string;
    type?: string;
    width?: number;
    height?: number;
    [key: string]: unknown;
  };
  text?: string;
  chosen?: boolean;
  selected?: boolean;
  [key: string]: unknown;
}

export interface ChartDataPoint {
  id: string | number;
  value: string | number;
  tooltip?: string | null;
  featured?: boolean;
  hiddenDot?: boolean;
  [key: string]: unknown;
}

export interface ChartDataset {
  id: string | number;
  title?: string;
  datas: ChartDataPoint[];
  [key: string]: unknown;
}

export interface ArgumentItem {
  id: string | number;
  text: string;
  chosen?: boolean;
  selected?: boolean;
  image?: {
    type?: string;
    src?: string | null;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface QuizLayerDesign {
  basis?: number | string;
  verticalAlign?: string;
  horizontalAlign?: string;
  icon?: string;
  iconPosition?: string;
  grid?: string;
  orientation?: string;
  order?: string;
  transparentImage?: boolean;
  aspectImage?: string;
  background?: string;
  gap?: string;
  shadow?: string;
  border?: string;
  style?: string;
  contrast?: boolean;
  padding?: string;
  pulse?: boolean;
  bubble?: boolean;
  fixed?: boolean;
  layout?: string;
  color?: string;
  area?: boolean;
  axisY?: boolean;
  axisX?: boolean;
  gridY?: boolean;
  gridX?: boolean;
  ratio?: string;
  datasets?: Array<{ fill: string; colors: string[] }>;
  [key: string]: unknown;
}

export interface QuizLayerContent {
  text?: string;
  id?: string | number;
  name?: string;
  image?: {
    src: string;
    type?: string;
    width?: number;
    height?: number;
    [key: string]: unknown;
  };
  required?: boolean;
  multiple?: boolean;
  introType?: string;
  introduction?: string;
  options?: QuizOption[];
  type?: string | null;
  clear?: string;
  label?: string;
  destination?: string;
  pulse?: boolean;
  target?: boolean;
  title?: string | null;
  description?: string | null;
  seconds?: number;
  starts?: number;
  show_title?: boolean;
  show_percent?: boolean;
  show_progress?: boolean;
  items?: CarouselItem[];
  centered?: boolean;
  spoiler?: boolean;
  pagination?: boolean;
  layout?: string;
  xAxis?: string[];
  datasets?: ChartDataset[];
  arguments?: ArgumentItem[];
  cols?: string;
  order?: string;
  quotes?: QuizQuote[];
  video?: string;
  value?: string;
  before?: string;
  after?: string;
  redirect?: boolean;
  featured?: string;
  [key: string]: unknown;
}

export interface QuizLayer {
  id: string | number;
  title: string;
  icon?: string;
  type: string;
  design?: QuizLayerDesign | unknown[];
  content?: QuizLayerContent;
  effects?: {
    starts?: number;
    [key: string]: unknown;
  };
  step?: string | number;
  chosen?: boolean;
  selected?: boolean;
  [key: string]: unknown;
}

export interface QuizStep {
  id: string;
  title: string;
  layers: QuizLayer[];
  position?: { x: number; y: number };
  chosen?: boolean;
  selected?: boolean;
  options?: {
    show_progress?: boolean;
    show_back?: boolean;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface QuizData {
  id: string | number;
  hash: string;
  title: string;
  slug: string;
  description?: string;
  domain?: string | number;
  origin?: string;
  status?: string | number;
  steps: QuizStep[];
  design: QuizDesign;
  navigation: Record<string, string>;
  scripts?: unknown;
  webhook?: unknown;
  seo?: unknown[];
  version?: number | string;
  [key: string]: unknown;
}
