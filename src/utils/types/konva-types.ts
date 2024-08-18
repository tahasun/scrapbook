import { z } from 'zod';

const KImageSchema = z.object({
    id: z.number().optional(),
    image: z.instanceof(HTMLImageElement).optional(),
    x: z.number().optional(),
    y: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    url: z.string().optional(),
  });
  
const KTextSchema = z.object({
    id: z.number().optional(),
    text: z.string().optional(),
    x: z.number().optional(),
    y: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    direction: z.string().optional(),
    fontSize: z.string().optional(),
    fontFamily: z.string().optional(),
    fontStyle: z.string().optional(),
    fontVariant: z.string().optional(),
    textDecoration: z.string().optional(),
  });

  export type KImage = z.infer<typeof KImageSchema>;
  export type KText = z.infer<typeof KTextSchema>;

  export type KObject = KImage | KText;

  interface KMapping {
    type: KObject;
    element: "Image";
  }
  
  enum KONVA_OBJECT_TYPES {
    IMAGE = "Image" ,
  };