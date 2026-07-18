export const Schema = z.object({
  世界: z.object({
    时间: z.string(),
    地点: z.string().prefault('西部住宅区_绿洲景苑小区'),
  }),
  主角: z.object({
    饱食度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    精神值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    金钱: z.coerce.number().prefault(1800),
    心情值: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
    性欲值: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
    快感值: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
    整体色情值: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
  }),
});
export type Schema = z.output<typeof Schema>;
