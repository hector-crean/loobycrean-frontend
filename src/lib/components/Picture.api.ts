type SourceSetElement = { src: string; width: number };

interface Source {
    type: string;
    media_query: string;
    srcset: Array<SourceSetElement>;
}

export type { SourceSetElement, Source };
