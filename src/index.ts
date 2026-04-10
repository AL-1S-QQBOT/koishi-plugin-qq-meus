import { Context, Random, Schema } from 'koishi'
import { } from "@koishijs/plugin-adapter-qq"


export const name = 'qq-meus'

export interface Config { }

export const Config: Schema<Config> = Schema.object({})




const random = new Random(() => Math.random())


type md_format = {
  msg_id?: string
  event_id?: string
  msg_type: number
  markdown: {
    content: any
  }

}
export async function send_md_mess(session, md: md_format) {
  try {
    if (session.event.platform == 'qq') {
      if (session.event.guild) {
        await session.qq.sendMessage(session.channelId, md)
      } else {
        await session.qq.sendPrivateMessage(session.event.user.id, md)
      }
    } else if (session.event.platform == 'qqguild') {
      await session.qqguild.sendMessage(session.event.channel.id, md)
    }
  } catch (e) {
    console.log(e)
  }
}



export async function apply(ctx: Context) {




  ////////鉴权器
  let bots = {
    appId: "",//appid ,必填
    secret: "",//secret,必填
  };
  let bot_tok = {
    token: '',//获取到的token，string，乱填（）
    expiresIn: 31//过期时间，number，乱填（）
  }
  async function refreshToken(bot) {
    const { access_token: accessToken, expires_in: expiresIn } = await ctx.http.post('https://bots.qq.com/app/getAppAccessToken', {
      appId: bot.appId,
      clientSecret: bot.secret
    });
    bot_tok.token = accessToken;
    bot_tok.expiresIn = expiresIn
  }
  //await refreshToken(bots)//运行
  console.log(bot_tok)//结果




  /**
   * 
   * 
   * 
    const mdp1 = `# 邦邦咔邦，老师您好\n
    > 功能列表：\n
    > ➢ <qqbot-cmd-input text='/心奈唱歌' show='🎶**【新功能】**心奈唱歌表情包' reference='true' />\n
  ***\n
    > ➢ <qqbot-cmd-input text='/今日运势' show='🔮今日运势查询' reference='true' />\n
  ***\n
    > ➢ <qqbot-cmd-input text='/天气 ' show='🌦️查看您所在城市的天气' reference='true' />\n
  ***\n
    > ➢ <qqbot-cmd-input text='/wife' show='💞查看今天的老婆群友' reference='true' />\n
  ***\n
    > ➢ <qqbot-cmd-input text='/ba表情包' show='🥳随机ba表情包' reference='true' />\n
  ***\n
    > ➢ <qqbot-cmd-input text='/图图' show='🖼️随机ba图片' reference='true' />\n
  ***\n
    > ➢ <qqbot-cmd-input text='/talk ' show='💬生成momotalk对话' reference='true' />\n
  ***\n
    > ➢ <qqbot-cmd-input text='/抽漫画' show='🌈随机ba漫画' reference='true' />\n
  ***\n
    > ➢ <qqbot-cmd-input text='/balogo ' show='💫生成ba标题风格的图片' reference='true' />\n
     ***\n
    `
    const mdp2 = `# 这是第二页！老师\n
    > ➢ <qqbot-cmd-input text='/ba转生' show='✨生成在鸡窝托斯的形象' reference='true' />\n
     ***\n
    > ➢ <qqbot-cmd-input text='/攻略 ' show='🔍角色攻略查询' reference='true' />\n
     ***\n
    > ➢ <qqbot-cmd-input text='/好感 ' show='❣️角色升级所需好感' reference='true' />\n
     ***\n
    > ➢ <qqbot-cmd-input text='/抽卡' show='📒ba抽卡模拟器' reference='true' />\n
     ***\n
    > ➢ <qqbot-cmd-input text='/总力档线' show='📈查询ba总力战档线' reference='true' />\n
     ***\n
    > ➢ <qqbot-cmd-input text='/升级 ' show='⬆️计算玩家升级所需' reference='true' />\n
     ***\n
    > ➢ <qqbot-cmd-input text='/国际服千里眼' show='👀国际服千里眼' reference='true' />\n
     ***\n
    > ➢ <qqbot-cmd-input text='/国服千里眼' show='👀国服千里眼' reference='true' />\n
     ***\n
    > ➢ <qqbot-cmd-input text='/活动日程' show='📅活动日程查询' reference='true' />\n
    ***\n
    `
   */



  let butt1 = {
    buttons: [
      {
        render_data: { label: "🎈添加至群聊", style: 1 },
        action: {
          type: 0,
          permission: { type: 2 },
          data: `https://bot.q.qq.com/s/6lvs7fce2?id=102062652`,
        },
      },
      {
        render_data: { label: "▶下一页", visited_label: "🟢下一页", style: 1 },
        action: {
          type: 1, // 指令按钮
          permission: { type: 2 },
          data: `/next_page_2`,
          //enter: true
        },
      },
    ]
  }

  let butt2 = {
    buttons: [
      {
        render_data: { label: "🎈添加至群聊", style: 1 },
        action: {
          type: 0,
          permission: { type: 2 },
          data: `https://bot.q.qq.com/s/6lvs7fce2?id=102062652`,
        },
      },
      {
        render_data: { label: "◀上一页", visited_label: "🟢上一页", style: 1 },
        action: {
          type: 1, // 指令按钮
          permission: { type: 2 },
          data: `/next_page_1`,
          //enter: true
        },
      },
    ]
  }


  let buttaa = {
    buttons: [
      {
        render_data: { label: "🔗友情链接", style: 1 },
        action: {
          type: 1,
          permission: { type: 2 },
          data: `/friends_link`,
        },
      },
      {
        render_data: { label: "📃使用文档", style: 1 },
        action: {
          type: 0, // 指令按钮
          permission: { type: 2 },
          data: `https://docs.qq.com/doc/DY2x2SEtBVUlodHlF`,
          //enter: true
        },
      },

    ]
  }


  let butt3 = {
    buttons: [
      {
        render_data: { label: "📆ba only展", style: 1 },
        action: {
          type: 0, // 指令按钮
          permission: { type: 2 },
          data: `https://docs.qq.com/doc/DY0pkVExJdXpiZ1FI`,
          //enter: true
        },
      },
    ]
  }
  let butt4 = {
    buttons: [
      {
        render_data: { label: "❤给爱丽丝充电", style: 1 },
        action: {
          type: 0, // 指令按钮
          permission: { type: 2 },
          data: `https://afdian.com/a/alin-sky`,
          //enter: true
        },
      },
      {
        render_data: { label: "AL_1S团队纳新", style: 1 },
        action: {
          type: 0, // 指令按钮
          permission: { type: 2 },
          data: `https://docs.qq.com/form/page/DY3h1cG1yd2JVVEFi`,
          //enter: true
        },
      },
    ]
  }

  async function sendMessage(session, md) {
    await refreshToken(bots)//刷新权限，配合鉴权器
    try {
      // 发送消息
      //api：	/v2/groups/{group_openid}/messages
      const messss: any = await ctx.http.post(`https://api.sgroup.qq.com/v2/groups/${session.guildId}/messages`, md,
        {
          headers: {
            Authorization: `QQBot ${bot_tok.token}`,
            'X-Union-Appid': bots.appId
          }
        }
      )
      console.log(messss)
    } catch (error) {
      console.error('发送消息失败:', error);
    }
  }

  let iii = 0

  let intmid = ''
  ctx.on("interaction/button", async sess => {

    console.log("点击量：" + iii++)

    if (sess.event.button['data'] == '/next_page_2') {
      intmid = sess.event._data.id
      return sess.execute('菜单 2')
    } else if (sess.event.button['data'] == '/next_page_1') {
      intmid = sess.event._data.id
      return sess.execute('菜单')
    } else if (sess.event.button['data'] == '/friends_link') {
      console.log(sess)
      let md1 = {
        msg_type: 2,
        event_id: sess.event._data.id,
        markdown: {
          content: '#其他bot'
        },
        keyboard: {
          content: {
            rows: [
              {
                buttons: [
                  {
                    render_data: { label: "📜返回菜单", style: 1 },
                    action: {
                      type: 1,
                      permission: { type: 2 },
                      data: `/next_page_1`,
                    },
                  },
                ],
              },
              {
                buttons: [
                  {
                    render_data: { label: "幻梦", style: 1 },
                    action: {
                      type: 0, // 指令按钮
                      permission: { type: 2 },
                      data: `https://bot.q.qq.com/s/bliij0949?id=102084850`,
                      //enter: true
                    },
                  },
                  {
                    render_data: { label: "小小", style: 1 },
                    action: {
                      type: 0, // 指令按钮
                      permission: { type: 2 },
                      data: `https://bot.q.qq.com/s/dpcpva26x?id=102074059`,
                      //enter: true
                    },
                  }

                ]
              },
              {
                buttons: [
                  {
                    render_data: { label: "芳糖助手_SugarPublic", style: 1 },
                    action: {
                      type: 0, // 指令按钮
                      permission: { type: 2 },
                      data: `https://bot.q.qq.com/s/3ewpir2j0?id=102070088`,
                      //enter: true
                    },
                  },
                  {
                    render_data: { label: "可爱小春", style: 1 },
                    action: {
                      type: 0, // 指令按钮
                      permission: { type: 2 },
                      data: `https://bot.q.qq.com/s/2idcvy923?id=102107787`,
                      //enter: true
                    },
                  }
                ]
              },
              {
                buttons: [
                  {
                    render_data: { label: "AL1S_Maid", style: 1 },
                    action: {
                      type: 0, // 指令按钮
                      permission: { type: 2 },
                      data: `https://bot.q.qq.com/s/9ccs8ypds?id=102068387`,
                      //enter: true
                    },
                  },
                  {
                    render_data: { label: "Key(仅保留了攻略功能)", style: 1 },
                    action: {
                      type: 0, // 指令按钮
                      permission: { type: 2 },
                      data: `https://bot.q.qq.com/s/2m05khrkt?id=102076738`,
                      //enter: true
                    },
                  },
                ]
              },
              {
                buttons: [
                  {
                    render_data: { label: "阿慈谷日富美", style: 1 },
                    action: {
                      type: 0, // 指令按钮
                      permission: { type: 2 },
                      data: `https://bot.q.qq.com/s/6ux5o17nk?id=102481872`,
                      //enter: true
                    },
                  },
                ]
              }
            ],
          },
        },
      }

      await send_md_mess(sess, md1)
    }
  })



  ctx.command('bao').action(async ({ session }, arg1) => {
    session.qq.sendMessage(session.channelId, {
      msg_id: session.messageId,
      msg_type: 2,
      markdown: {
        content: `
# ba-only场次信息文档
        `
      },
      keyboard: {
        content: {
          rows: [
            {
              buttons: [
                {
                  render_data: { label: "📆ba only展", style: 1 },
                  action: {
                    type: 0, // 指令按钮
                    permission: { type: 2 },
                    data: `https://docs.qq.com/doc/DY0pkVExJdXpiZ1FI`,
                    //enter: true
                  },
                },
              ]
            },
          ],
        },
      },
    })
    return
  })



  ctx.command('菜单 <arg1>').action(async ({ session }, arg1) => {

    const tuurl = [
      'https://i0.hdslb.com/bfs/new_dyn/b598619b516ec54f34a0ccf84e526221138938665.png'

    ]


    let uuurl = random.pick(tuurl)

    const mdp1 = `# 邦邦咔邦，老师您好
  > ![img #480px #270px](${uuurl})
  > ➢ <qqbot-cmd-input text='/心奈唱歌' show='🎶心奈唱歌表情包' reference='true' />
  > ➢ <qqbot-cmd-input text='/今日运势' show='🔮今日运势查询' reference='true' />
  > ➢ <qqbot-cmd-input text='/抽漫画' show='🌈随机ba漫画' reference='true' />
  > ➢ <qqbot-cmd-input text='/攻略 ' show='🔍角色攻略查询' reference='true' />
  > ➢ <qqbot-cmd-input text='/好感 ' show='❣️角色升级所需好感' reference='true' />
  > ➢ <qqbot-cmd-input text='/抽卡' show='📒ba抽卡模拟器' reference='true' />
  > ➢ <qqbot-cmd-input text='/国际服千里眼' show='👀国际服千里眼' reference='true' />
  `
    const mdp2 = `# 这是第二页！老师
  > ![img #480px #270px](${uuurl})
  > ➢ <qqbot-cmd-input text='/天气' show='☀天气查询' reference='true' />
  > ➢ <qqbot-cmd-input text='/ba转生' show='✨生成在鸡窝托斯的形象' reference='true' />
  > ➢ <qqbot-cmd-input text='/ba表情包' show='🥳随机ba表情包' reference='true' />
  > ➢ <qqbot-cmd-input text='/总力档线' show='📈查询ba总力战档线' reference='true' />
  > ➢ <qqbot-cmd-input text='/升级 ' show='⬆️计算玩家升级所需' reference='true' />
  > ➢ <qqbot-cmd-input text='/国服千里眼' show='👀国服千里眼' reference='true' />
  > ➢ <qqbot-cmd-input text='/活动日程' show='📅活动日程查询' reference='true' />
  `

    let mes_id = session.messageId ? session.messageId : intmid
    let md1 = {
      msg_type: 2,
      event_id: mes_id,
      markdown: {
        content: ''
      },
      keyboard: {
        content: {
          rows: [],
        },
      },
    }

    let mess_id = session.messageId ? session.messageId : intmid
    if (session.messageId) {
      delete md1.event_id;
      md1['msg_id'] = mess_id;
    }

    if (arg1 == '1' || !arg1) {
      md1.markdown.content = mdp1
      md1.keyboard.content.rows.push(butt1)
      md1.keyboard.content.rows.push(buttaa)
      md1.keyboard.content.rows.push(butt3)
      md1.keyboard.content.rows.push(butt4)
    } else if (arg1 == '2') {
      md1.markdown.content = mdp2
      md1.keyboard.content.rows.push(butt2)
      md1.keyboard.content.rows.push(buttaa)
      md1.keyboard.content.rows.push(butt3)
      md1.keyboard.content.rows.push(butt4)
    }
    //session.qq.sendMessage(session.channelId, md1)

    await send_md_mess(session, md1)
  })

}
