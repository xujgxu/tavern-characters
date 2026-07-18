export const Schema = z.object({
  世界: z.object({
    时间: z.string(),
    地点: z.string().prefault('西部住宅区_绿洲景苑小区-6幢601'),
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

  APP: z.object({
    等级: z.coerce.number().prefault(1).transform(v => _.clamp(v, 1, 5)),
    经验值: z.coerce.number().prefault(0),
    已完成任务数: z.coerce.number().prefault(0),
    本周已完成: z.boolean().prefault(false),
    当前任务: z.object({
      名称: z.string(),
      类型: z.string(),
      等级: z.coerce.number(),
      色情维度: z.coerce.number(),
      社会维度: z.coerce.number(),
      内容: z.string(),
      报酬: z.coerce.number(),
      可选挑战: z.string(),
      状态: z.string(),
    }).nullable().prefault(null),
    待选任务: z.array(z.object({
      名称: z.string(),
      类型: z.string(),
      等级: z.coerce.number(),
      色情维度: z.coerce.number(),
      社会维度: z.coerce.number(),
      内容: z.string(),
      报酬: z.coerce.number(),
      可选挑战: z.string(),
    })).prefault([]),
  }),
});
export type Schema = z.output<typeof Schema>;
