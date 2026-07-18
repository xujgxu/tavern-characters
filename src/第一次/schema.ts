export const Schema = z.object({
  世界: z.object({
    时间: z.string(),
  }),
  主角: z.object({
    饱食度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    精神值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
  }),
});
export type Schema = z.output<typeof Schema>;
