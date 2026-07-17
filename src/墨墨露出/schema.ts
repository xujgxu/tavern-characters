import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';

export const Schema = z.object({
  世界: z.object({
    当前时间: z.string(),
    当前地点: z.string(),
    游戏阶段: z.string(),
    结局状态: z.string(),
    近期事务: z.record(z.string(), z.string()),
  }).prefault({}),

  主角: z.object({
     姓名: z.string(),
     年龄: z.coerce.number(),
     身份: z.string(),
     金钱: z.coerce.number().transform(v => _.max([v, 0])),
     衣物: z.record(z.string(), z.string()),
     持有物: z.record(z.string(), z.object({
       描述: z.string(),
       数量: z.coerce.number().transform(v => _.max([v, 0])),
     })).prefault({}),
   }),

  数值: z.object({
    饱食度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    精神值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    心情值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    性欲值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    快感值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    整体色情值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
  }),

  日程: z.object({
    日期: z.string(),
    星期: z.string(),
    是否学期: z.boolean(),
    固定日程: z.array(z.object({
      时间: z.string(),
      事项: z.string(),
      地点: z.string(),
      完成: z.boolean(),
    })).prefault([]),
    课程掌握度: z.record(z.string(), z.coerce.number().transform(v => _.clamp(v, 0, 100))),
    志愿者时长: z.coerce.number().transform(v => _.max([v, 0])),
    论文完成度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    实习小时: z.coerce.number().transform(v => _.max([v, 0])),
    牝多多等级: z.coerce.number().transform(v => _.clamp(v, 1, 5)),
    牝多多经验: z.coerce.number().transform(v => _.max([v, 0])),
    可用任务: z.array(z.object({
      任务名: z.string(),
      类型: z.enum(['露出类', '道具类', '拍摄类', '陪玩类', '临时工类']),
      阶级: z.string(),
      截止: z.string().optional(),
      目标: z.string(),
      报酬: z.coerce.number(),
      额外要求: z.string().optional(),
    })).optional(),
    当前任务: z.object({
      任务名: z.string(),
      类型: z.enum(['露出类', '道具类', '拍摄类', '陪玩类', '临时工类']),
      阶级: z.string(),
      截止: z.string().optional(),
      目标: z.string(),
      报酬: z.coerce.number(),
      完成: z.boolean().optional(),
    }).optional(),
     任务历史: z.record(z.string(), z.record(z.string(), z.unknown())),
     用户日程: z.array(z.object({
       时间: z.string(),
       事项: z.string(),
       地点: z.string().optional(),
       联系人: z.string().optional(),
       类型: z.enum(['固定', '约定', '提醒']),
       完成: z.boolean().optional(),
      })).prefault([]),
   }),

  服装库: z.record(z.string(), z.object({
    部位标签: z.array(z.string()),
    风格标签: z.array(z.string()),
    材质标签: z.array(z.string()),
    颜色标签: z.array(z.string()),
    特质标签: z.array(z.string()),
    色情值: z.coerce.number(),
    表象值: z.coerce.number(),
    价格: z.coerce.number(),
    描述: z.string(),
  })),

  衣柜: z.object({
     当前穿着: z.array(z.string()).prefault(['居家蕾丝睡裙']),
     当前环境: z.string(),
     可选服装: z.record(z.string(), z.record(z.string(), z.unknown())),
     等待换装: z.boolean(),
     出门目的地: z.string(),
     已提示地点: z.string(),
     最近选择: z.array(z.string()),
   }),

  穿着: z.record(z.string(), z.string()),

  场景: z.object({
    当前区域: z.string(),
    环境秩序: z.string(),
    人员密度: z.string(),
    风险等级: z.string(),
    可中止条件: z.string(),
    近期NPC: z.array(z.string()),
  }),

  社交: z.object({
    联系人: z.record(z.string(), z.object({
      状态: z.enum(['已保存', '未保存', '工作联系', '拉黑']),
      身份: z.string(),
      好感度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    })),
    微信: z.object({
      收件箱: z.array(z.record(z.string(), z.string())),
      发件箱: z.array(z.record(z.string(), z.string())),
    }),
  }),
});
export type Schema = z.output<typeof Schema>;

$(() => {
  registerMvuSchema(Schema);
});
