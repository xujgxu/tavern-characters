export const Schema = z.object({
  世界: z.object({
    时间: z.string(),
    地点: z.string(),
  }),

  主角: z.object({
    饱食度: z.coerce.number().transform(v => _.isNaN(v) ? 0 : _.clamp(v, 0, 100)),
    精神值: z.coerce.number().transform(v => _.isNaN(v) ? 0 : _.clamp(v, 0, 100)),
    心情值: z.coerce.number().transform(v => _.isNaN(v) ? 0 : _.clamp(v, 0, 100)),
    金钱: z.coerce.number().transform(v => _.isNaN(v) ? 0 : v),
    性欲值: z.coerce.number().transform(v => _.isNaN(v) ? 0 : _.clamp(v, 0, 100)),
    快感值: z.coerce.number().transform(v => _.isNaN(v) ? 0 : _.clamp(v, 0, 100)),
  }),

  APP: z.object({
    等级: z.coerce.number().transform(v => _.isNaN(v) ? 1 : _.clamp(v, 1, 5)),
    经验值: z.coerce.number().transform(v => _.isNaN(v) ? 0 : v),
    已完成任务数: z.coerce.number().transform(v => _.isNaN(v) ? 0 : v),
    当前任务: z.object({
      类型: z.string(),
      等级: z.coerce.number().transform(v => _.isNaN(v) ? 1 : v),
      色情维度: z.coerce.number().transform(v => _.isNaN(v) ? 1 : v),
      社会维度: z.coerce.number().transform(v => _.isNaN(v) ? 1 : v),
      内容: z.string(),
      报酬: z.coerce.number().transform(v => _.isNaN(v) ? 0 : v),
      可选挑战: z.string(),
      状态: z.string(),
    }).nullable(),
  }),

  学业: z.object({
    宏观经济学上: z.coerce.number().transform(v => _.isNaN(v) ? 0 : _.clamp(v, 0, 100)),
    微观经济学上: z.coerce.number().transform(v => _.isNaN(v) ? 0 : _.clamp(v, 0, 100)),
    金融管理上: z.coerce.number().transform(v => _.isNaN(v) ? 0 : _.clamp(v, 0, 100)),
    宏观经济学下: z.coerce.number().transform(v => _.isNaN(v) ? 0 : _.clamp(v, 0, 100)),
    微观经济学下: z.coerce.number().transform(v => _.isNaN(v) ? 0 : _.clamp(v, 0, 100)),
    金融管理下: z.coerce.number().transform(v => _.isNaN(v) ? 0 : _.clamp(v, 0, 100)),
    志愿者时长: z.coerce.number().transform(v => _.isNaN(v) ? 0 : v),
    实习时长: z.coerce.number().transform(v => _.isNaN(v) ? 0 : v),
    论文进度: z.coerce.number().transform(v => _.isNaN(v) ? 0 : _.clamp(v, 0, 100)),
  }),

  服装: z.object({
    穿着: z.array(z.object({
      名称: z.string(),
      部位标签: z.array(z.string()),
      风格标签: z.array(z.string()),
      颜色图案标签: z.array(z.string()),
      状态标签: z.array(z.string()),
      色情值: z.coerce.number().transform(v => _.isNaN(v) ? 0 : _.clamp(v, 0, 100)),
      描述: z.string(),
    })),
    整体色情值: z.coerce.number().transform(v => _.isNaN(v) ? 0 : _.clamp(v, 0, 100)),
  }),

  联系人: z.record(z.string(), z.object({
    好感度: z.coerce.number().transform(v => _.isNaN(v) ? 0 : _.clamp(v, 0, 100)),
    身份: z.string(),
  })),
});
export type Schema = z.output<typeof Schema>;
