/**
 * 《测测你的宿命恋人在哪个城市》核心数据配置
 * 包含：6大性格维度、5大测试篇章、40道生活化单选题、16座中国地理宿命城市图谱
 */

window.TEST_DATA = (function () {
  const DIMENSIONS = [
    {
      key: 'warmth',
      name: '烟火松弛',
      shortName: '烟火',
      desc: '懂得把日子过热乎，自带松弛感与人情温度'
    },
    {
      key: 'poetry',
      name: '诗意清雅',
      shortName: '诗意',
      desc: '审美细腻敏感，向往留白、默契与精神共振'
    },
    {
      key: 'passion',
      name: '炽热直球',
      shortName: '炽热',
      desc: '爱憎分明敢表达，拥有明快鲜活的生命张力'
    },
    {
      key: 'freedom',
      name: '旷达山野',
      shortName: '旷达',
      desc: '向往辽阔远方与不被定义的自在舒展'
    },
    {
      key: 'ambition',
      name: '摩登锋芒',
      shortName: '锋芒',
      desc: '清醒独立讲秩序，欣赏势均力敌的成长感'
    },
    {
      key: 'steadfast',
      name: '厚重笃定',
      shortName: '笃定',
      desc: '重情守诺情绪稳，偏好经得起时间检验的深情'
    }
  ];

  const CHAPTERS = [
    { id: 1, numeral: '卷一', title: '晨昏日常', subtitle: '日常习惯 · 藏在琐碎里的生活底色', range: [1, 8] },
    { id: 2, numeral: '卷二', title: '处事方圆', subtitle: '处事方式 · 面对选择与风浪的姿态', range: [9, 16] },
    { id: 3, numeral: '卷三', title: '浮生清欢', subtitle: '社交模式 · 人群之中与亲密之间的距离', range: [17, 24] },
    { id: 4, numeral: '卷四', title: '心海潮汐', subtitle: '情绪反应 · 心动、委屈与自愈的节律', range: [25, 32] },
    { id: 5, numeral: '卷五', title: '风物偏爱', subtitle: '兴趣偏好 · 潜意识里向往的山河气场', range: [33, 40] }
  ];

  // 40道生活化单选题：每题4个选项，每个选项对6个维度有清晰且均衡的权重贡献
  const QUESTIONS = [
    // ==================== 卷一 · 晨昏日常（日常习惯）1-8 ====================
    {
      id: 1,
      chapter: 1,
      category: '日常习惯',
      text: '周末难得没有闹钟自然醒，你最享受的早晨打开方式是？',
      options: [
        { label: 'A', text: '赖到日上三竿，慢悠悠下楼吃一碗热气腾腾的早餐', weights: { warmth: 3, steadfast: 1 } },
        { label: 'B', text: '拉开窗帘看会儿天光，手冲一杯咖啡配轻音乐发呆', weights: { poetry: 3, freedom: 1 } },
        { label: 'C', text: '按生物钟利落起床，趁清静把运动或想做的事推进完', weights: { ambition: 3, steadfast: 1 } },
        { label: 'D', text: '临时起意叫上朋友出门晒太阳，或者直接去周边晃一圈', weights: { passion: 2, freedom: 2 } }
      ]
    },
    {
      id: 2,
      chapter: 1,
      category: '日常习惯',
      text: '走进一家口碑不错但完全陌生的餐馆点菜，你的真实状态更接近？',
      options: [
        { label: 'A', text: '让老板推荐最地道的招牌，热热闹闹先点一桌尝鲜', weights: { warmth: 2, passion: 2 } },
        { label: 'B', text: '先看菜单搭配和菜品细节，讲究口味层次和清爽顺口', weights: { poetry: 2, ambition: 2 } },
        { label: 'C', text: '挑几道稳妥不踩雷的家常硬菜，吃得踏实舒坦最重要', weights: { steadfast: 3, warmth: 1 } },
        { label: 'D', text: '专挑没见过名字的新奇菜式，好吃是惊喜，踩雷也算体验', weights: { freedom: 3, passion: 1 } }
      ]
    },
    {
      id: 3,
      chapter: 1,
      category: '日常习惯',
      text: '出门在外，手机电量不知不觉掉到20%以下时，你的内心活动是？',
      options: [
        { label: 'A', text: '早有准备，包里常备充电宝或提前留意好了借电的地方', weights: { ambition: 2, steadfast: 2 } },
        { label: 'B', text: '有点焦虑，赶紧切省电模式，速战速决处理完关键消息', weights: { ambition: 3, poetry: 1 } },
        { label: 'C', text: '无所谓，没电就顺便戒网两小时，看看街景发发呆也挺好', weights: { freedom: 3, warmth: 1 } },
        { label: 'D', text: '赶紧给重要的人发句"快没电了"，然后顺路找家热闹小店边吃边充', weights: { warmth: 2, passion: 2 } }
      ]
    },
    {
      id: 4,
      chapter: 1,
      category: '日常习惯',
      text: '关于自己常待的房间或桌面，你最舒服的状态往往是？',
      options: [
        { label: 'A', text: '极简克制、动线清爽，每样东西都在它最顺手的位置', weights: { ambition: 3, poetry: 1 } },
        { label: 'B', text: '带一点生活气息的微乱，随手能摸到抱枕、零食和常看的物件', weights: { warmth: 3, freedom: 1 } },
        { label: 'C', text: '会有香薰、绿植或几张好看的明信片，角落里藏着审美小心思', weights: { poetry: 3, warmth: 1 } },
        { label: 'D', text: '实用耐看为主，留着很多年舍不得扔的纪念品和旧物', weights: { steadfast: 3, passion: 1 } }
      ]
    },
    {
      id: 5,
      chapter: 1,
      category: '日常习惯',
      text: '忙完高强度的一天回到家，最能让你瞬间"回血"的小事是？',
      options: [
        { label: 'A', text: '洗个热水澡换上宽松家居服，配着下饭剧吃顿热乎饭', weights: { warmth: 3, steadfast: 1 } },
        { label: 'B', text: '关掉大灯只留一盏暖黄小夜灯，彻底静音独处半小时', weights: { poetry: 3, steadfast: 1 } },
        { label: 'C', text: '换双鞋下楼夜跑、兜风，或者去吹吹晚风把疲惫甩掉', weights: { freedom: 2, passion: 2 } },
        { label: 'D', text: '把今天的事复盘清空、列好明天清单，心里才算真正落地', weights: { ambition: 3, steadfast: 1 } }
      ]
    },
    {
      id: 6,
      chapter: 1,
      category: '日常习惯',
      text: '遇到一件价格略高于预算、但第一眼就戳中你的物件，你通常会？',
      options: [
        { label: 'A', text: '千金难买我高兴，喜欢就要立刻拿下，快乐不能延迟', weights: { passion: 3, freedom: 1 } },
        { label: 'B', text: '先放进收藏夹冷静两天，顺便对比材质、性价比和使用率', weights: { ambition: 2, steadfast: 2 } },
        { label: 'C', text: '如果它的设计感和质感无可替代，愿意为这份心动买单', weights: { poetry: 3, ambition: 1 } },
        { label: 'D', text: '顺便问问身边懂行的朋友，如果大家也觉得实用温暖就入手', weights: { warmth: 2, steadfast: 2 } }
      ]
    },
    {
      id: 7,
      chapter: 1,
      category: '日常习惯',
      text: '傍晚走在路上，突然下起一场没预报的大雨而你没带伞，第一反应是？',
      options: [
        { label: 'A', text: '躲进路边屋檐或便利店，买杯热饮顺便看雨景等雨小', weights: { poetry: 2, warmth: 2 } },
        { label: 'B', text: '立刻打车或顺手买把伞，绝不让行程被天气打乱节奏', weights: { ambition: 3, steadfast: 1 } },
        { label: 'C', text: '觉得挺有电影感，干脆在雨里快步冲刺，淋湿了也痛快', weights: { passion: 2, freedom: 2 } },
        { label: 'D', text: '先看看离家多远，顺便发消息提醒同城的家人朋友注意避雨', weights: { steadfast: 2, warmth: 2 } }
      ]
    },
    {
      id: 8,
      chapter: 1,
      category: '日常习惯',
      text: '临睡前半小时，你的手机屏幕里最常停留在哪种画面？',
      options: [
        { label: 'A', text: '美食探店、搞笑段子或和朋友漫无边际的闲聊', weights: { warmth: 2, passion: 2 } },
        { label: 'B', text: '摄影图集、播客文字、书摘或者安静的小众歌单', weights: { poetry: 3, freedom: 1 } },
        { label: 'C', text: '行业资讯、效率工具、待办复盘或明天的日程提醒', weights: { ambition: 3, steadfast: 1 } },
        { label: 'D', text: '旅行攻略、远方风景vlog，或者随手刷到的冷门奇闻', weights: { freedom: 3, poetry: 1 } }
      ]
    },

    // ==================== 卷二 · 处事方圆（处事方式）9-16 ====================
    {
      id: 9,
      chapter: 2,
      category: '处事方式',
      text: '计划一场三天两夜的短途旅行，你的行前准备风格更像？',
      options: [
        { label: 'A', text: '只订好往返交通和落脚处，到了当地走到哪儿算哪儿', weights: { freedom: 3, warmth: 1 } },
        { label: 'B', text: '做一份清晰的高效路线表，交通、预约和备选方案都井井有条', weights: { ambition: 3, steadfast: 1 } },
        { label: 'C', text: '重点标记出必吃老店和夜市，行程围绕"吃好喝好"展开', weights: { warmth: 3, passion: 1 } },
        { label: 'D', text: '提前搜集小众美术馆、日落机位和有故事的老街慢逛', weights: { poetry: 3, freedom: 1 } }
      ]
    },
    {
      id: 10,
      chapter: 2,
      category: '处事方式',
      text: '工作或生活里突然冒出一个从未碰过的棘手难题，你的第一动作是？',
      options: [
        { label: 'A', text: '迅速拆解问题结构、查资料定节点，先拿出可执行方案', weights: { ambition: 3, steadfast: 1 } },
        { label: 'B', text: '不慌不躁先稳住局面，一步一步啃硬骨头，直到彻底解决', weights: { steadfast: 3, ambition: 1 } },
        { label: 'C', text: '直接找有经验的人聊聊碰撞思路，边干边调最快见效', weights: { passion: 2, warmth: 2 } },
        { label: 'D', text: '跳出常规框架想想有没有更巧妙的弯道解法，不死磕旧路', weights: { freedom: 2, poetry: 2 } }
      ]
    },
    {
      id: 11,
      chapter: 2,
      category: '处事方式',
      text: '和朋友约好见面，临出发前对方发消息说堵车要晚半小时，你会？',
      options: [
        { label: 'A', text: '完全不介意，正好在附近找家咖啡馆或书店享受半小时独处', weights: { poetry: 2, freedom: 2 } },
        { label: 'B', text: '让对方别急注意安全，自己顺手先去排队拿号或者逛逛小店', weights: { warmth: 3, steadfast: 1 } },
        { label: 'C', text: '表面说没事，心里默默把这半小时用来回完几条工作消息', weights: { ambition: 3, steadfast: 1 } },
        { label: 'D', text: '半开玩笑调侃一句"罚你请喝奶茶"，见面照样热热闹闹', weights: { passion: 3, warmth: 1 } }
      ]
    },
    {
      id: 12,
      chapter: 2,
      category: '处事方式',
      text: '眼前出现一个充满未知、但很有吸引力的新机会，做决定时你最看重？',
      options: [
        { label: 'A', text: '它能不能带我去更大的平台、突破现有的天花板', weights: { ambition: 3, passion: 1 } },
        { label: 'B', text: '这件事本身够不够新鲜有趣，能不能让我看见不一样的风景', weights: { freedom: 3, poetry: 1 } },
        { label: 'C', text: '底盘稳不稳、长期值不值得托付，不爱做没有退路的豪赌', weights: { steadfast: 3, warmth: 1 } },
        { label: 'D', text: '跟着直觉和热血走，机会难得，先冲进去再说', weights: { passion: 3, freedom: 1 } }
      ]
    },
    {
      id: 13,
      chapter: 2,
      category: '处事方式',
      text: '团队或朋友群里商量大事出现分歧、气氛略微僵持时，你通常会？',
      options: [
        { label: 'A', text: '先讲句轻松的话缓和气氛，照顾两边的情绪再慢慢撮合', weights: { warmth: 3, poetry: 1 } },
        { label: 'B', text: '直接把利弊摆上台面，用事实和逻辑帮大家快速收敛结论', weights: { ambition: 3, steadfast: 1 } },
        { label: 'C', text: '不绕弯子亮明自己的核心立场，痛痛快快把话说透', weights: { passion: 3, ambition: 1 } },
        { label: 'D', text: '默默听完所有人的顾虑，最后提出一个更折中稳妥的方案', weights: { steadfast: 3, poetry: 1 } }
      ]
    },
    {
      id: 14,
      chapter: 2,
      category: '处事方式',
      text: '如果事后发现，自己之前很笃定的一个判断其实错了，你会怎么处理？',
      options: [
        { label: 'A', text: '大大方方承认"我搞错了"，立刻翻篇修正，不纠结面子', weights: { passion: 2, freedom: 2 } },
        { label: 'B', text: '快速复盘错在哪个信息环节，下次建立机制避免再犯', weights: { ambition: 3, steadfast: 1 } },
        { label: 'C', text: '心里会有点过意不去，认真向受影响的人致歉并把后续补救好', weights: { steadfast: 3, warmth: 1 } },
        { label: 'D', text: '暗暗记在心里反思一阵子，用更细腻的观察力调整自己的直觉', weights: { poetry: 3, steadfast: 1 } }
      ]
    },
    {
      id: 15,
      chapter: 2,
      category: '处事方式',
      text: '同时有三四件重要又耗神的事情压过来，你的真实应对姿态是？',
      options: [
        { label: 'A', text: '立刻按轻重缓急排优先级，开启专注模式逐个击破', weights: { ambition: 3, steadfast: 1 } },
        { label: 'B', text: '先去喝口热茶缓五分钟，告诉自己急也没用，一件件稳着来', weights: { warmth: 2, steadfast: 2 } },
        { label: 'C', text: '肾上腺素飙升反而更有干劲，一鼓作气全给它干翻', weights: { passion: 3, ambition: 1 } },
        { label: 'D', text: '先挑最能激发灵感的那件下手，实在太窒息就先出门透口气', weights: { freedom: 2, poetry: 2 } }
      ]
    },
    {
      id: 16,
      chapter: 2,
      category: '处事方式',
      text: '当亲近的朋友向你倾诉一个反复踩坑的烦恼，你更倾向于怎样回应？',
      options: [
        { label: 'A', text: '先陪着吐槽、顺毛安抚，约顿好吃的把坏情绪先吃掉', weights: { warmth: 3, passion: 1 } },
        { label: 'B', text: '温柔地接住对方的委屈，用恰到好处的共情让他自己想明白', weights: { poetry: 3, warmth: 1 } },
        { label: 'C', text: '一针见血帮他剖析根源和破局步骤，怕他下次再吃亏', weights: { ambition: 2, steadfast: 2 } },
        { label: 'D', text: '拉着他换个环境去兜风或看场演出，"别内耗了，世界大得很"', weights: { freedom: 3, passion: 1 } }
      ]
    },

    // ==================== 卷三 · 浮生清欢（社交模式）17-24 ====================
    {
      id: 17,
      chapter: 3,
      category: '社交模式',
      text: '被朋友拉去一场大多是陌生人的聚会，你通常会成为人群里的哪一种角色？',
      options: [
        { label: 'A', text: '自来熟的气氛担当，三句话就能和旁边的人聊成一片', weights: { passion: 3, warmth: 1 } },
        { label: 'B', text: '安静坐在角落观察众生相，但遇到同频的人能聊到散场', weights: { poetry: 3, freedom: 1 } },
        { label: 'C', text: '得体大方、进退有度，能聊干货也能照顾到冷场的人', weights: { ambition: 2, steadfast: 2 } },
        { label: 'D', text: '跟着熟人吃吃喝喝、笑眯眯附和，自在放松不刻意营业', weights: { warmth: 3, freedom: 1 } }
      ]
    },
    {
      id: 18,
      chapter: 3,
      category: '社交模式',
      text: '微信突然收到一位不太熟的人发来一句干巴巴的"在吗？"，你的本能反应是？',
      options: [
        { label: 'A', text: '心里默默扣分，更喜欢有事直说，礼貌回个"在的，什么事呀"', weights: { ambition: 3, steadfast: 1 } },
        { label: 'B', text: '先放一会儿看对方会不会补充，不想被突然打破自己的节奏', weights: { poetry: 2, freedom: 2 } },
        { label: 'C', text: '秒回"咋啦，说！"，万一对方真有急事能帮一把呢', weights: { passion: 2, warmth: 2 } },
        { label: 'D', text: '虽然有点纳闷，但还是客气回复，看看对方需要什么帮忙', weights: { steadfast: 2, warmth: 2 } }
      ]
    },
    {
      id: 19,
      chapter: 3,
      category: '社交模式',
      text: '你最珍视、也最能长久维持的亲密关系模式是？',
      options: [
        { label: 'A', text: '不用天天粘着，但只要见面依然像昨天刚聊过一样默契', weights: { freedom: 2, steadfast: 2 } },
        { label: 'B', text: '事事有回应、件件有着落，彼此分享一日三餐的琐碎日常', weights: { warmth: 3, steadfast: 1 } },
        { label: 'C', text: '能一起聊审美、聊心事，一个眼神就懂对方未说出口的话', weights: { poetry: 3, steadfast: 1 } },
        { label: 'D', text: '彼此独立又互相托举，一起变好、一起去更大的世界冒险', weights: { ambition: 2, passion: 2 } }
      ]
    },
    {
      id: 20,
      chapter: 3,
      category: '社交模式',
      text: '当你对一个人产生强烈心动时，你释放信号的方式更像？',
      options: [
        { label: 'A', text: '藏不住一点，眼睛亮晶晶的，主动找话题、约见面打直球', weights: { passion: 3, freedom: 1 } },
        { label: 'B', text: '不动声色地记住对方的小习惯，在细节里默默偏爱和照顾', weights: { steadfast: 3, warmth: 1 } },
        { label: 'C', text: '发一首隐喻心情的歌、分享一片好看的晚霞，等对方读懂暗号', weights: { poetry: 3, freedom: 1 } },
        { label: 'D', text: '保持优雅克制，先观察彼此三观和节奏是否契合，再大方推进', weights: { ambition: 3, poetry: 1 } }
      ]
    },
    {
      id: 21,
      chapter: 3,
      category: '社交模式',
      text: '在一段恋爱里，以下哪种相处状态最让你觉得窒息或消耗？',
      options: [
        { label: 'A', text: '事事被盘问、没有呼吸感，连发呆和独处都要报备解释', weights: { freedom: 3, poetry: 1 } },
        { label: 'B', text: '冷暴力、藏着掖着不说话，让人反复猜心思', weights: { passion: 3, warmth: 1 } },
        { label: 'C', text: '敷衍画饼、情绪大起大落，给不了踏实的安全感', weights: { steadfast: 3, warmth: 1 } },
        { label: 'D', text: '思想停滞、拒绝沟通成长，总在鸡毛蒜皮里互相内耗', weights: { ambition: 3, freedom: 1 } }
      ]
    },
    {
      id: 22,
      chapter: 3,
      category: '社交模式',
      text: '情人节或相恋纪念日快到了，你对"仪式感"的真实态度是？',
      options: [
        { label: 'A', text: '不必铺张昂贵，但要有一份走心的小礼物或手写字句留念', weights: { poetry: 3, steadfast: 1 } },
        { label: 'B', text: '仪式感拉满！精心打扮吃顿好饭、拍好看合照，把爱意大声晒出来', weights: { passion: 2, ambition: 2 } },
        { label: 'C', text: '比起特定日子，更在意平时顺路带回的一束花和一碗热汤', weights: { warmth: 3, steadfast: 1 } },
        { label: 'D', text: '避开人挤人的网红餐厅，趁机逃离城市去看海或看星星更带感', weights: { freedom: 3, poetry: 1 } }
      ]
    },
    {
      id: 23,
      chapter: 3,
      category: '社交模式',
      text: '如果你和另一半因为意见不合吵了一架，你最希望怎样收场？',
      options: [
        { label: 'A', text: '吵完立刻抱一抱把话说开，绝不把隔夜气留到明天', weights: { passion: 3, warmth: 1 } },
        { label: 'B', text: '各自先冷静半小时整理情绪，再心平气和把问题聊透解决', weights: { ambition: 2, steadfast: 2 } },
        { label: 'C', text: '不用太严肃的复盘，对方递来一杯奶茶或牵起手就能瞬间软化', weights: { warmth: 3, freedom: 1 } },
        { label: 'D', text: '一起出门散个步吹吹风，在安静的夜色里慢慢把心结揉开', weights: { poetry: 3, steadfast: 1 } }
      ]
    },
    {
      id: 24,
      chapter: 3,
      category: '社交模式',
      text: '你心目中最高级的浪漫，最贴近下面哪一个画面？',
      options: [
        { label: 'A', text: '黄昏菜市场提着刚买的果蔬并肩回家，灯火可亲', weights: { warmth: 3, steadfast: 1 } },
        { label: 'B', text: '细雨微风里共撑一把伞，在无人的长巷慢走却不觉沉默尴尬', weights: { poetry: 3, steadfast: 1 } },
        { label: 'C', text: '开着车放着歌追一场日落，驶向地图上临时选中的远方', weights: { freedom: 3, passion: 1 } },
        { label: 'D', text: '各自在擅长的领域闪闪发光，深夜归来仍能碰杯分享彼此的世界', weights: { ambition: 3, poetry: 1 } }
      ]
    },

    // ==================== 卷四 · 心海潮汐（情绪反应）25-32 ====================
    {
      id: 25,
      chapter: 4,
      category: '情绪反应',
      text: '某天毫无缘由地涌上一阵低落或疲惫，你通常会如何自我消化？',
      options: [
        { label: 'A', text: '约最铁的朋友吃顿重口味大餐，大笑一场把乌云吹散', weights: { passion: 2, warmth: 2 } },
        { label: 'B', text: '戴上耳机独自走很远的路，看树影、吹晚风，让情绪自然流淌', weights: { poetry: 2, freedom: 2 } },
        { label: 'C', text: '睡一觉或者收拾房间、做点具体的小事，用秩序感把心稳住', weights: { steadfast: 2, ambition: 2 } },
        { label: 'D', text: '干脆给自己放半天假，买点甜食窝在沙发上彻底摆烂充电', weights: { warmth: 3, freedom: 1 } }
      ]
    },
    {
      id: 26,
      chapter: 4,
      category: '情绪反应',
      text: '看完一部后劲很大的好电影，字幕缓缓升起时，你的状态往往是？',
      options: [
        { label: 'A', text: '沉浸在余韵里很久缓不过来，回去还要翻影评、循环原声带', weights: { poetry: 3, steadfast: 1 } },
        { label: 'B', text: '立刻拉着身边人疯狂输出感想，把最燃最戳的片段重演一遍', weights: { passion: 3, warmth: 1 } },
        { label: 'C', text: '会拆解导演的叙事手法和隐喻，冷静欣赏背后的巧思', weights: { ambition: 3, poetry: 1 } },
        { label: 'D', text: '被里面的远方或人生选择触动，突然萌生一股想出发的冲动', weights: { freedom: 3, passion: 1 } }
      ]
    },
    {
      id: 27,
      chapter: 4,
      category: '情绪反应',
      text: '被人误解了一件你在意的事情，那一瞬间你的情绪反应更像？',
      options: [
        { label: 'A', text: '当场就得掰扯清楚，不能白白受委屈，解释完立马翻篇', weights: { passion: 3, ambition: 1 } },
        { label: 'B', text: '表面云淡风轻不想辩解，心里却会悄悄拉远和对方的距离', weights: { poetry: 3, freedom: 1 } },
        { label: 'C', text: '先克制住情绪，找合适时机用事实和证据把误会体面化解', weights: { ambition: 2, steadfast: 2 } },
        { label: 'D', text: '觉得懂我的人自然懂，时间久了日久见人心，懒得费口舌', weights: { steadfast: 3, warmth: 1 } }
      ]
    },
    {
      id: 28,
      chapter: 4,
      category: '情绪反应',
      text: '当你拿到一个期待已久的好消息时，你最想做的第一件事是？',
      options: [
        { label: 'A', text: '第一时间告诉最亲近的人，请大家吃顿好的共享喜悦', weights: { warmth: 2, passion: 2 } },
        { label: 'B', text: '嘴角偷偷上扬，给自己买一束花或一份小礼物默默庆祝', weights: { poetry: 3, warmth: 1 } },
        { label: 'C', text: '开心五分钟后迅速冷静，开始规划下一步怎么把优势放大', weights: { ambition: 3, steadfast: 1 } },
        { label: 'D', text: '立刻订张机票或安排一场小放飞，用一场出走奖励自己', weights: { freedom: 3, passion: 1 } }
      ]
    },
    {
      id: 29,
      chapter: 4,
      category: '情绪反应',
      text: '生活里突然发生变故、原本的计划全被打乱时，撑住你的内在力量是？',
      options: [
        { label: 'A', text: '"船到桥头自然直"，心宽一点，总能找到舒服的新活法', weights: { warmth: 2, freedom: 2 } },
        { label: 'B', text: '"兵来将挡水来土掩"，咬牙扛过去，越是逆风越沉得住气', weights: { steadfast: 3, passion: 1 } },
        { label: 'C', text: '快速止损、重构方案，用理性和掌控感驱散失控的焦虑', weights: { ambition: 3, steadfast: 1 } },
        { label: 'D', text: '相信一切绕路都是另一种风景，把经历当作人生的留白', weights: { poetry: 2, freedom: 2 } }
      ]
    },
    {
      id: 30,
      chapter: 4,
      category: '情绪反应',
      text: '某个安静的深夜，突然想起一段带着遗憾的旧事，你会怎么安放它？',
      options: [
        { label: 'A', text: '任由思绪飘一会儿，写下两句感悟或听首老歌，与过去温柔和解', weights: { poetry: 3, steadfast: 1 } },
        { label: 'B', text: '叹口气翻个身睡去，"过去的都过去了，明天还有热乎日子要过"', weights: { warmth: 3, freedom: 1 } },
        { label: 'C', text: '把遗憾变成燃料，提醒自己以后更果断、不留后悔', weights: { passion: 2, ambition: 2 } },
        { label: 'D', text: '珍藏起那些真心付出的瞬间，感恩它塑造了如今更稳重的自己', weights: { steadfast: 3, poetry: 1 } }
      ]
    },
    {
      id: 31,
      chapter: 4,
      category: '情绪反应',
      text: '当你非常在乎的人突然情绪崩溃、眼眶通红，你本能的第一反应是？',
      options: [
        { label: 'A', text: '二话不说先抱住对方或递上纸巾，轻声说"别怕，有我在"', weights: { steadfast: 2, warmth: 2 } },
        { label: 'B', text: '立刻护短炸毛："谁欺负你了？走，我现在就陪你去散心！"', weights: { passion: 3, freedom: 1 } },
        { label: 'C', text: '安静陪在身旁不急着说教，等哭完再轻柔地梳理思绪', weights: { poetry: 3, steadfast: 1 } },
        { label: 'D', text: '一边安抚情绪一边迅速接管棘手烂摊子，帮对方把实际麻烦解决', weights: { ambition: 3, steadfast: 1 } }
      ]
    },
    {
      id: 32,
      chapter: 4,
      category: '情绪反应',
      text: '如果用一种自然气象形容你内心最真实的情绪底色，它更接近？',
      options: [
        { label: 'A', text: '午后斜照进阳台的暖阳，不炙热，却让人想眯眼打盹', weights: { warmth: 3, steadfast: 1 } },
        { label: 'B', text: '江南微雨后的薄雾山岚，清澈细腻，藏着不动声色的温柔', weights: { poetry: 3, warmth: 1 } },
        { label: 'C', text: '盛夏一场痛快的雷阵雨与晚霞，来得热烈，散得干脆', weights: { passion: 3, freedom: 1 } },
        { label: 'D', text: '秋日高远澄澈的晴空与晚风，清醒通透，自带开阔边界', weights: { freedom: 2, ambition: 2 } }
      ]
    },

    // ==================== 卷五 · 风物偏爱（兴趣偏好）33-40 ====================
    {
      id: 33,
      chapter: 5,
      category: '兴趣偏好',
      text: '如果能拥有一间理想中的小房子，你最想在推开窗的那一刻看见？',
      options: [
        { label: 'A', text: '楼下梧桐树影与热腾腾的早点摊，转角就能听见市井笑声', weights: { warmth: 3, passion: 1 } },
        { label: 'B', text: '一片平静的水面、白墙黛瓦，或是风吹过竹叶沙沙作响', weights: { poetry: 3, steadfast: 1 } },
        { label: 'C', text: '一望无际的海岸线、雪山或草原，云朵低得像伸手就能碰到', weights: { freedom: 3, poetry: 1 } },
        { label: 'D', text: '流光溢彩的城市天际线与江景灯火，充满现代都会的生命力', weights: { ambition: 3, passion: 1 } }
      ]
    },
    {
      id: 34,
      chapter: 5,
      category: '兴趣偏好',
      text: '你耳机里单曲循环最久的那类歌，往往带着怎样的气质？',
      options: [
        { label: 'A', text: '旋律温柔抓耳的流行老歌或轻快民谣，听着就心情松弛', weights: { warmth: 2, steadfast: 2 } },
        { label: 'B', text: '词意讲究的国风、独立民谣或纯音乐，越夜越有画面感', weights: { poetry: 3, steadfast: 1 } },
        { label: 'C', text: '节奏感强烈的摇滚、说唱或复古迪斯科，瞬间点燃精气神', weights: { passion: 3, ambition: 1 } },
        { label: 'D', text: '公路摇滚、世界音乐或空灵电子，仿佛已经在奔赴远方的路上', weights: { freedom: 3, ambition: 1 } }
      ]
    },
    {
      id: 35,
      chapter: 5,
      category: '兴趣偏好',
      text: '如果给你一个完全自由的周末下午，以下哪个去处最让你心动？',
      options: [
        { label: 'A', text: '钻进老街巷寻觅藏了二十年的苍蝇馆子和茶社晒太阳', weights: { warmth: 3, steadfast: 1 } },
        { label: 'B', text: '逛一场安静的艺术展、园林或独立书店，顺手买本好看的画册', weights: { poetry: 3, ambition: 1 } },
        { label: 'C', text: '看一场Livehouse演出、脱口秀，或约三五好友热火朝天打局游戏', weights: { passion: 3, warmth: 1 } },
        { label: 'D', text: '去海边骑行、爬一座野山，或在草坪上搭天幕吹风看云', weights: { freedom: 3, warmth: 1 } }
      ]
    },
    {
      id: 36,
      chapter: 5,
      category: '兴趣偏好',
      text: '你对一座城市产生"好感滤镜"，往往最先被它的什么特质打动？',
      options: [
        { label: 'A', text: '物价友好、美食遍地、街头巷尾都有人情味和松弛感', weights: { warmth: 3, passion: 1 } },
        { label: 'B', text: '有历史厚重感、四季分明，能让人安心扎根的长久气息', weights: { steadfast: 3, poetry: 1 } },
        { label: 'C', text: '高效便利、审美在线、包容多元，充满无限可能与机遇', weights: { ambition: 3, freedom: 1 } },
        { label: 'D', text: '有山有海有清风，连空气里都飘着自由浪漫的度假气息', weights: { freedom: 2, poetry: 2 } }
      ]
    },
    {
      id: 37,
      chapter: 5,
      category: '兴趣偏好',
      text: '如果要拍一组代表自己气质的人生写真，你最偏爱的氛围感是？',
      options: [
        { label: 'A', text: '胶片质感的烟火街头，手里拿着糖炒栗子或热奶茶回眸大笑', weights: { warmth: 2, passion: 2 } },
        { label: 'B', text: '新中式清冷留白风，青衫素衣、光影斑驳，自带故事感', weights: { poetry: 3, steadfast: 1 } },
        { label: 'C', text: '都市极简高级感，利落风衣、霓虹夜色，眼神笃定有锋芒', weights: { ambition: 3, steadfast: 1 } },
        { label: 'D', text: '旷野逆光大片，头发被风吹乱，背景是苍茫山海与落日余晖', weights: { freedom: 3, passion: 1 } }
      ]
    },
    {
      id: 38,
      chapter: 5,
      category: '兴趣偏好',
      text: '挑一部陪伴长途旅行的书或剧，你最容易被哪种故事吸引？',
      options: [
        { label: 'A', text: '细腻温暖的市井群像与家庭日常，笑着笑着就看红了眼眶', weights: { warmth: 3, steadfast: 1 } },
        { label: 'B', text: '文字考究、情感克制深沉的文艺佳作或经典年代剧', weights: { poetry: 2, steadfast: 2 } },
        { label: 'C', text: '高智商悬疑、职场博弈或爽感拉满的逆袭成长故事', weights: { ambition: 3, passion: 1 } },
        { label: 'D', text: '公路冒险、奇幻异世界或探索自然人文的纪录片', weights: { freedom: 3, poetry: 1 } }
      ]
    },
    {
      id: 39,
      chapter: 5,
      category: '兴趣偏好',
      text: '深夜十一点突然有点饿，面前摆着四种宵夜，你最想伸手拿哪一种？',
      options: [
        { label: 'A', text: '滋滋冒油的炭火烧烤或红油滚烫的小锅，配冰饮才够爽', weights: { passion: 3, warmth: 1 } },
        { label: 'B', text: '一碗清鲜暖胃的老火靓汤、虾饺或细面，温润不油腻', weights: { warmth: 2, steadfast: 2 } },
        { label: 'C', text: '精致微醺小酒配一碟芝士坚果或法式甜点，享受片刻仪式感', weights: { ambition: 2, poetry: 2 } },
        { label: 'D', text: '骑车去海边或路边摊买份现做的特色小吃，吹着夜风边走边吃', weights: { freedom: 3, warmth: 1 } }
      ]
    },
    {
      id: 40,
      chapter: 5,
      category: '兴趣偏好',
      text: '最后一道题：如果把你期待的宿命爱情比作四季里的某一刻，它更像？',
      options: [
        { label: 'A', text: '冬夜围炉煮茶、窗外飘雪，屋里是永远为你亮着的一盏暖灯', weights: { steadfast: 3, warmth: 1 } },
        { label: 'B', text: '江南四月的微风杏花雨，一眼万年，往后皆是细水长流', weights: { poetry: 3, warmth: 1 } },
        { label: 'C', text: '盛夏海岛的橘子汽水与烟花夜，肆意奔跑、炽热又坦荡', weights: { passion: 2, freedom: 2 } },
        { label: 'D', text: '秋夜山顶或江畔并肩看万家灯火，清醒相爱，共赴山海前程', weights: { ambition: 2, freedom: 2 } }
      ]
    }
  ];

  // 16座中国地理宿命城市图谱（覆盖华东、华北、华南、西南、西北、东北、华中）
  // profile 为各城市在6个维度上的理想气质画像（0-100），算法会进行中心化与余弦+欧氏联合匹配
  const CITIES = [
    {
      id: 'chengdu',
      name: '成都',
      pinyin: 'CHENGDU',
      region: '四川 · 巴蜀盆地',
      geoZone: '西南',
      coords: '30°39′N · 104°04′E',
      seal: '安逸巴蜀',
      title: '松弛烟火里的温柔生活家',
      accent: '#C45A45',
      secondary: '#6B8A7A',
      quote: '“别人教你赶路，而成都的宿命恋人，会牵起你在银杏树下喝茶看云，告诉你慢一点也没关系。”',
      profile: { warmth: 95, poetry: 62, passion: 55, freedom: 58, ambition: 24, steadfast: 66 },
      traits: ['自带松弛结界', '人间烟火派', '温柔好相处', '情绪价值满格'],
      matchReason:
        '你的灵魂底色里藏着极高的「烟火松弛」与「温和笃定」。你并不迷信紧绷的精致，真正能让你卸下防备的，是把普通日子过出香气的本事。成都的恋人身上既有盆地滋养出的慢调与包容，又有不疾不徐的生活智慧——你们在一起不必表演完美，一顿冒着热气的夜宵、一场说走就走的茶馆发呆，就能把彼此的疲惫悄悄接住。',
      hiddenStrength:
        '你拥有罕见的“关系减压阀”天赋。无论外界多嘈杂，只要进入你的情感场域，对方就会感到安心、舒展、被允许做自己，这种不内耗的松弛感是长期亲密关系里最稀缺的宝藏。',
      easterEgg: {
        scene: '某个微凉的秋日午后，在玉林路飘着桂花香的拐角咖啡馆，你们同时伸手去拿最后一盘刚出炉的蛋烘糕。',
        token: '一杯带盖碗茶香的桂花拿铁 & 一张泛黄的银杏书签',
        code: '“今天太阳出得刚好，要不要去公园晒两小时太阳？”'
      }
    },
    {
      id: 'chongqing',
      name: '重庆',
      pinyin: 'CHONGQING',
      region: '重庆 · 魔幻山城',
      geoZone: '西南',
      coords: '29°33′N · 106°33′E',
      seal: '山城炽爱',
      title: '江湖直球的炽烈浪漫派',
      accent: '#B8332A',
      secondary: '#D18B47',
      quote: '“山城的路从不走寻常直线，但重庆的宿命恋人爱你这件事，永远走最坦荡的那条直球路线。”',
      profile: { warmth: 80, poetry: 22, passion: 94, freedom: 82, ambition: 38, steadfast: 66 },
      traits: ['爱意明火执仗', '义气护短', '生命力爆棚', '反差萌温柔'],
      matchReason:
        '你的得分显示出耀眼的「炽热直球」与「烟火气」，骨子里讨厌扭捏试探和冷暴力，偏爱坦坦荡荡的双向奔赴。重庆的恋人就像嘉陵江畔的夜色与红油老灶——外表飒爽利落、带点江湖侠气，内心却滚烫又护短。你不需要费力猜对方心意，因为TA的喜欢全写在眼神、行动和永远偏向你这一边的立场里。',
      hiddenStrength:
        '你自带极强的“破冰与点燃力”。在一段容易趋于平淡的关系里，你总能用鲜活的幽默感与真诚的表达，把柴米油盐过出热恋期的心跳感，让对方永远觉得和你在一起很有趣。',
      easterEgg: {
        scene: '两江交汇的晚风里，在十八梯半山腰看轻轨穿楼而过时，TA顺手把外套披在你肩上，笑着带你拐进只有本地人知道的坡坎老店。',
        token: '一碗加满冰粉小料的冰甜凉虾 & 一张跨江索道旧车票',
        code: '“导航说这里没有路，但跟着我走准没错。”'
      }
    },
    {
      id: 'dali',
      name: '大理',
      pinyin: 'DALI',
      region: '云南 · 苍山洱海',
      geoZone: '西南',
      coords: '25°36′N · 100°16′E',
      seal: '风花雪月',
      title: '乘风逐云的自由灵魂伴侣',
      accent: '#4F7A82',
      secondary: '#C59B5F',
      quote: '“风吹过苍山十九峰，才把那个同样不愿被时钟驯服的灵魂，吹到了你的身边。”',
      profile: { warmth: 72, poetry: 84, passion: 52, freedom: 96, ambition: 18, steadfast: 44 },
      traits: ['拒绝被定义', '精神自由派', '自然疗愈感', '浪漫理想主义'],
      matchReason:
        '你在「旷达山野」与「诗意清雅」上的高分，说明你灵魂深处需要留白与呼吸感，对功利化、条条框框的催促天然过敏。大理的宿命恋人正是那个能读懂你“想逃离人群看会儿云”的人——TA不会用世俗标准丈量你，而是愿意陪你骑行洱海、收集晚霞，在不被打扰的慢时光里做彼此最轻盈的同行者。',
      hiddenStrength:
        '你有着极佳的“审美直觉与精神松绑能力”。和你相处久了，对方会慢慢放下无谓的焦虑与紧绷，重新看见生活里的云朵、微风与热爱本身。',
      easterEgg: {
        scene: '洱海西岸生态廊道，一场突如其来的太阳雨把你们困在白族老院子的屋檐下，抬头正好看见横跨苍山的双彩虹。',
        token: '一块手染扎染蓝方巾 & 一段录着海风与民谣的语音',
        code: '“别赶行程了，今天的风这么好，我们在这里坐到日落吧。”'
      }
    },
    {
      id: 'suzhou',
      name: '苏州',
      pinyin: 'SUZHOU',
      region: '江苏 · 姑苏水乡',
      geoZone: '华东',
      coords: '31°18′N · 120°35′E',
      seal: '姑苏雅韵',
      title: '温润如玉的江南诗画知己',
      accent: '#54736E',
      secondary: '#B6895B',
      quote: '“你不必声嘶力竭地证明深情，苏州的宿命恋人，连为你撑伞倾斜的角度都写满江南的温柔。”',
      profile: { warmth: 58, poetry: 96, passion: 24, freedom: 48, ambition: 46, steadfast: 84 },
      traits: ['克制而深情', '审美极度在线', '细节控温柔', '精神同频'],
      matchReason:
        '你的核心维度集中在「诗意清雅」与「厚重笃定」。你偏爱润物细无声的默契，比起浮夸的口号，更会被一句恰逢其时的懂你、一个细腻体贴的举动瞬间击中。姑苏之城的恋人恰似雨后天青釉色——语气温软、分寸极好、骨子里有江南文人的雅致与长情，能和你一起把琐碎生活过成一幅留白恰到好处的宋画。',
      hiddenStrength:
        '你拥有超凡的“微情绪感知力”。你能察觉到别人忽略的叹息与欲言又止，用最体面不冒犯的方式托住对方的脆弱，是让人一靠近就觉得被妥帖珍藏的恋人。',
      easterEgg: {
        scene: '梅雨季的平江路，细雨打在青石板上，你们在同一家旧书店的窗边同时翻开了同一本诗集。',
        token: '一把素面苏绣折扇 & 一盒桂花糖藕味的时令茶点',
        code: '“雨好像一时半会儿停不了，要一起听段评弹再走吗？”'
      }
    },
    {
      id: 'hangzhou',
      name: '杭州',
      pinyin: 'HANGZHOU',
      region: '浙江 · 西子湖畔',
      geoZone: '华东',
      coords: '30°16′N · 120°09′E',
      seal: '西湖风雅',
      title: '清雅灵动的现代雅士恋人',
      accent: '#4C7C73',
      secondary: '#B97856',
      quote: '“一半是山水茶烟的清雅，一半是数字潮头的灵动，杭州的宿命恋人恰好接住你的浪漫与野心。”',
      profile: { warmth: 62, poetry: 84, passion: 46, freedom: 62, ambition: 78, steadfast: 56 },
      traits: ['清雅又有上进心', '审美品位俱佳', '浪漫务实兼备', '松弛有序'],
      matchReason:
        '你的「诗意清雅」与「摩登锋芒」形成了极漂亮的平衡：你既向往有美感、有情调的精神世界，又不愿放弃现实里的成长与体面。杭州正是中国最擅长把“古典诗意”和“现代效率”无缝融合的城市——这里的恋人白天能与你并肩聊理想、拼事业，傍晚又能牵你漫步北山街、九溪听泉，让浪漫落地生根。',
      hiddenStrength:
        '你具备难得的“双轨平衡力”：在感性审美与理性决策之间切换自如，既能把生活打理得精致高效，又始终保留着为一片荷花、一场秋桂停下脚步的诗心。',
      easterEgg: {
        scene: '满觉陇丹桂飘香的十月傍晚，在西湖苏堤骑车吹风时，TA从车筐里递给你一杯温热的龙井桂花酿。',
        token: '一小罐明前狮峰龙井 & 一张手绘西湖秋色明信片',
        code: '“忙完这一阵，我带你去虎跑泉边喝早茶。”'
      }
    },
    {
      id: 'shanghai',
      name: '上海',
      pinyin: 'SHANGHAI',
      region: '上海 · 浦江十里',
      geoZone: '华东',
      coords: '31°13′N · 121°28′E',
      seal: '摩登清欢',
      title: '边界清晰的势均力敌恋人',
      accent: '#7A3E48',
      secondary: '#C59B5F',
      quote: '“最好的亲密不是彼此捆绑，而是上海梧桐街角的两杯冰美式——独立清醒，又恰好同频微醺。”',
      profile: { warmth: 32, poetry: 76, passion: 44, freedom: 54, ambition: 96, steadfast: 66 },
      traits: ['清醒克制', '极度讲边界感', '都市精致审美', '势均力敌'],
      matchReason:
        '你的「摩登锋芒」得分耀眼，同时兼具不俗的「诗意清雅」。你欣赏专业、克制、有分寸的成年人恋爱，最怕粘腻失控与情绪绑架。上海的宿命恋人自带大都会的体面与契约精神：尊重你的独立空间、懂你的审美段位、在关键时刻永远靠谱。你们不必互相依附，而是并肩站在更高处的最佳拍档。',
      hiddenStrength:
        '你拥有极高段位的“清醒经营力”。你懂得把爱意落到尊重、效率和高质量陪伴上，绝不陷入狗血内耗，能让一段关系越谈越体面、越谈越增值。',
      easterEgg: {
        scene: '深秋落叶铺满武康路与安福路交口，你们在一家安静的小众买手店兼咖啡馆里，因同时看中同一张黑胶唱片相视一笑。',
        token: '一张爵士黑胶唱片 & 两杯手冲瑰夏的纪念杯套',
        code: '“今晚十点外滩人少，要不要去吹风小酌一杯？”'
      }
    },
    {
      id: 'beijing',
      name: '北京',
      pinyin: 'BEIJING',
      region: '北京 · 燕山皇城',
      geoZone: '华北',
      coords: '39°54′N · 116°24′E',
      seal: '燕京厚意',
      title: '格局沉稳的厚重灵魂靠山',
      accent: '#9E312B',
      secondary: '#C59B5F',
      quote: '“看过红墙秋色与人间风浪，北京的宿命恋人给你的不是轻飘飘的誓言，而是托底一生的底气。”',
      profile: { warmth: 38, poetry: 56, passion: 64, freedom: 44, ambition: 86, steadfast: 92 },
      traits: ['沉稳有格局', '外冷内热', '重诺守信', '精神厚度极高'],
      matchReason:
        '你在「厚重笃定」与「摩登锋芒」上双双突出。你对浅薄的热闹提不起兴趣，真正吸引你的，是思想有厚度、行事有担当、遇事能扛事的成熟灵魂。北京的恋人自带燕赵大地的敞亮与格局——嘴上未必天天挂着甜言蜜语，甚至带点北京秋天的清爽傲气，但只要认定你，便会用最稳重的行动替你遮风挡雨。',
      hiddenStrength:
        '你是天生的“定海神针型伴侣”。别人慌乱时你冷静，外界喧嚣时你清醒，你给予伴侣的不仅是情感陪伴，更是一种能看清方向、稳住人生底盘的深层安全感。',
      easterEgg: {
        scene: '十月末的故宫角楼或什刹海畔，夕阳把金黄银杏染成琉璃色，TA嘴上说着“天冷别瞎逛了”，却顺手往你手里塞了一袋刚出锅的糖炒栗子。',
        token: '一袋冒着热气的怀柔糖炒栗子 & 一枚铜质宫墙书签',
        code: '“别慌，天塌下来也有我先顶着呢。”'
      }
    },
    {
      id: 'qingdao',
      name: '青岛',
      pinyin: 'QINGDAO',
      region: '山东 · 黄海之滨',
      geoZone: '华东',
      coords: '36°04′N · 120°23′E',
      seal: '山海清风',
      title: '清爽明朗的海风治愈系恋人',
      accent: '#3F6F8C',
      secondary: '#C86D51',
      quote: '“红瓦绿树、碧海蓝天，青岛的宿命恋人像八大关午后的海风，干净明朗，吹散你所有心事。”',
      profile: { warmth: 80, poetry: 56, passion: 58, freedom: 82, ambition: 34, steadfast: 78 },
      traits: ['干净清爽', '真诚敞亮', '治愈力满分', '自在稳重'],
      matchReason:
        '你的维度画像呈现出「旷达山野」「烟火松弛」与「厚重笃定」的黄金三角。你既热爱自由开阔的自然气息，又看重脚踏实地的真诚与靠谱。青岛的恋人集齐了北方人的厚道坦诚与海滨城市的清透浪漫——没有弯弯绕绕的小心思，带你迎着海风吃辣炒蛤蜊、在老城坡道散步，让爱情既轻盈又踏实。',
      hiddenStrength:
        '你自带“低耗能高治愈”的清朗气场。和你在一起没有压迫感，也没有猜忌感，像打开一扇面朝大海的窗，连呼吸都变得轻快而笃定。',
      easterEgg: {
        scene: '琴屿路日落时分，红白灯塔亮起微光，TA拎着两袋刚打的原浆啤酒和海风一起向你挥手走来。',
        token: '一枚磨圆的蔚蓝海玻璃 & 一张八大关梧桐街胶片照',
        code: '“今天能见度超高，走，去海边把烦恼全喂海鸥！”'
      }
    },
    {
      id: 'xian',
      name: '西安',
      pinyin: 'XIAN',
      region: '陕西 · 关中平原',
      geoZone: '西北',
      coords: '34°16′N · 108°56′E',
      seal: '长安长情',
      title: '念旧深情的千年长情守护者',
      accent: '#8E4B32',
      secondary: '#C59B5F',
      quote: '“长安城的城墙看过千年车马，而西安的宿命恋人，只想把一份漫长而笃定的偏爱留给你。”',
      profile: { warmth: 70, poetry: 80, passion: 46, freedom: 40, ambition: 36, steadfast: 96 },
      traits: ['极致长情', '念旧重义', '温厚有底蕴', '细水长流'],
      matchReason:
        '你在「厚重笃定」与「诗意清雅」上表现极深，说明你对“快餐式心动”免疫，内心真正向往的是经得起岁月推敲的深情。西安的宿命恋人正如十三朝古都的气韵——沉静、厚道、骨子里有文化根脉与老派浪漫。TA或许不擅长花哨的套路，却会记住你几年前随口提过的愿望，把“一屋两人三餐四季”默默兑现。',
      hiddenStrength:
        '你拥有极罕见的“时间复利型深情”。很多人只适合初见，而你越相处越让人心动——你的忠诚、记忆力与包容度，会让爱意随着年岁沉淀得愈发醇厚。',
      easterEgg: {
        scene: '傍晚骑行在古老的城墙上，看远处钟楼灯火次第点亮，你们一起分享一碗滚烫喷香的羊肉泡馍和冰峰汽水。',
        token: '一枚刻着小篆名字的青铜书签 & 一幅大雁塔落日剪影',
        code: '“别赶时间，好饭不怕晚，好的人值得等一辈子。”'
      }
    },
    {
      id: 'urumqi',
      name: '乌鲁木齐',
      pinyin: 'URUMQI',
      region: '新疆 · 天山北麓',
      geoZone: '西北',
      coords: '43°49′N · 87°36′E',
      seal: '天山星野',
      title: '辽阔热烈的星辰旷野同行者',
      accent: '#3B6E6C',
      secondary: '#D28A42',
      quote: '“当别人还在计较方寸得失，乌鲁木齐的宿命恋人，正带着天山雪风与晚九点的太阳奔向你。”',
      profile: { warmth: 62, poetry: 44, passion: 90, freedom: 96, ambition: 28, steadfast: 66 },
      traits: ['格局辽阔', '热忱坦荡', '冒险家灵魂', '爱得毫无保留'],
      matchReason:
        '你在「旷达山野」与「炽热直球」上双双冲顶！你的灵魂天生属于大风、星空与无垠地平线，厌倦琐碎计较与狭隘内耗。乌鲁木齐的恋人拥有西域大地的豪迈与炽烈——像晚上十点才落下的太阳一样，给你的爱意充足、热烈、坦荡又辽阔，能陪你穿过人海与山川，把平凡生活过成史诗般的公路电影。',
      hiddenStrength:
        '你自带“破局与扩容”的生命能量。你从不被眼前的小沟坎困住，总能带着伴侣把视野抬高、把心胸打开，让两个人的世界越走越宽广。',
      easterEgg: {
        scene: '夏夜九点半，天边还挂着橘粉色的晚霞，远处雪山清晰可见，你们在热闹的巴扎街头分吃一颗甜到心坎的哈密瓜。',
        token: '一颗来自天山脚下的暖色玛瑙石 & 一张手绘独库公路地图',
        code: '“天还早着呢，跟我去看一场最晚的日落吧！”'
      }
    },
    {
      id: 'harbin',
      name: '哈尔滨',
      pinyin: 'HARBIN',
      region: '黑龙江 · 松花江畔',
      geoZone: '东北',
      coords: '45°48′N · 126°32′E',
      seal: '冰城暖阳',
      title: '豪爽赤诚的冰雪暖阳恋人',
      accent: '#3B5C78',
      secondary: '#C9614B',
      quote: '“外界零下二十度又怎样？哈尔滨的宿命恋人，永远是那个为你搓热双手、笑声最暖的太阳。”',
      profile: { warmth: 78, poetry: 36, passion: 84, freedom: 52, ambition: 46, steadfast: 88 },
      traits: ['外刚内暖', '幽默感拉满', '绝对靠谱', '宠人不动声色'],
      matchReason:
        '你的得分结合了「厚重笃定」「炽热直球」与「烟火松弛」。你最看重一段关系里的真诚度与热乎劲儿——不怕日子偶有风雪，只怕人心冰凉。哈尔滨的恋人恰如冬日雪地里的一团篝火：自带东北人的爽朗幽默与侠骨柔情，外面天寒地冻，TA总能把最厚实的羽绒服、最甜的冻梨和最坚定的偏爱全留给你。',
      hiddenStrength:
        '你是顶级的“逆境暖场王”。越是在低谷或压力面前，你越能用豁达的幽默感与扎实的行动托住局面，让身边人觉得只要有你在，再冷的冬天都能笑着熬过去。',
      easterEgg: {
        scene: '大雪纷飞的中央大街，面包石上落满清雪，TA把刚买好的马迭尔冰棍递给你，又把自己的围巾严严实实绕在你脖子上。',
        token: '一根零下二十度的原味冰棍 & 一枚雪花纹鎏金胸针',
        code: '“冷啥呀，手揣我兜里，这不就暖和了！”'
      }
    },
    {
      id: 'wuhan',
      name: '武汉',
      pinyin: 'WUHAN',
      region: '湖北 · 江汉平原',
      geoZone: '华中',
      coords: '30°35′N · 114°18′E',
      seal: '江城飒意',
      title: '飒爽鲜活的江湖热忱搭档',
      accent: '#B54A3A',
      secondary: '#4B7285',
      quote: '“过得了大江大湖的风浪，也守得住晨间一碗热干面的温柔，武汉的宿命恋人爱你永远热气腾腾。”',
      profile: { warmth: 78, poetry: 32, passion: 84, freedom: 56, ambition: 78, steadfast: 60 },
      traits: ['敢拼敢爱', '烟火与进取并存', '痛快利落', '生命力顽强'],
      matchReason:
        '你的「炽热直球」「烟火松弛」与「摩登锋芒」三者齐飞！你既接地气、懂生活，又有股不服输的冲劲和锐气，最讨厌矫情拖沓。武汉的恋人正如九省通衢的江城气魄——大开大合、飒爽鲜活，工作时能和你一起披荆斩棘，收工后能陪你在长江轮渡上吹风吃小龙虾，是既能谈恋爱又能一起闯江湖的最佳战友。',
      hiddenStrength:
        '你具备极强的“抗压反弹力与行动力”。生活给你抛来难题，你从不原地内耗，而是边笑边把问题漂亮解决，这种蓬勃的生命力对伴侣有着致命的吸引力。',
      easterEgg: {
        scene: '春末樱花飘落的东湖绿道，或是长江大桥的金色落日里，两元钱的轮渡鸣笛起航，TA大声笑着指向江面晚霞。',
        token: '一张2元长江轮渡船票 & 一张樱花季限定明信片',
        code: '“别想那么多，先跟我去过个早，吃饱了啥事都能成！”'
      }
    },
    {
      id: 'changsha',
      name: '长沙',
      pinyin: 'CHANGSHA',
      region: '湖南 · 湘江麓山',
      geoZone: '华中',
      coords: '28°13′N · 112°56′E',
      seal: '星城热恋',
      title: '热烈有趣的灵魂玩伴型恋人',
      accent: '#C73E3A',
      secondary: '#D99343',
      quote: '“别人十二点已经入睡，而长沙的宿命恋人，正牵着你在凌晨的烟火气里把青春再重演一遍。”',
      profile: { warmth: 88, poetry: 48, passion: 96, freedom: 54, ambition: 60, steadfast: 32 },
      traits: ['情绪浓度极高', '天生乐天派', '有趣不无聊', '永远少年感'],
      matchReason:
        '你的「炽热直球」与「烟火松弛」充满蓬勃的快乐因子，同时带着灵动的「锋芒」与「旷达」。你害怕沉闷僵化，渴望一段永远有新鲜感、有笑声、有共鸣的恋爱。长沙的恋人就像橘子洲头的璀璨烟花与不眠夜宵街——脑洞大、好玩、表达爱意直接热烈，能把寻常周末都过成节日，让你永远保持心动的少年气。',
      hiddenStrength:
        '你是天生的“快乐制造机与氛围引擎”。你能敏锐捕捉生活里最鲜活有趣的切面，把普通约会变成难忘回忆，和你恋爱几乎不存在“无话可说”的冷场时刻。',
      easterEgg: {
        scene: '凌晨一点的湘江边依然人声鼎沸，你们人手一杯幽兰拿铁，迎着江风把刚买的小吃分着吃，笑到停不下来。',
        token: '两杯满是碧根果碎的茶饮 & 一张湘江焰火拍立得',
        code: '“才十一点怎么能睡？走，我带你去吃全城最绝的夜宵！”'
      }
    },
    {
      id: 'guangzhou',
      name: '广州',
      pinyin: 'GUANGZHOU',
      region: '广东 · 珠江三角洲',
      geoZone: '华南',
      coords: '23°08′N · 113°16′E',
      seal: '羊城温润',
      title: '务实暖心的细水长流生活派',
      accent: '#B06A3B',
      secondary: '#527968',
      quote: '“广州的宿命恋人从不画空头大饼，TA把所有的偏爱，都煲进了为你留着的那碗老火靓汤里。”',
      profile: { warmth: 92, poetry: 38, passion: 44, freedom: 42, ambition: 72, steadfast: 86 },
      traits: ['务实低调', '体贴入微', '懂吃会生活', '稳稳的幸福'],
      matchReason:
        '你在「烟火松弛」「厚重笃定」与「摩登锋芒」之间达到了极踏实的平衡。你既清醒务实、有把日子过好的能力，又不愿丢掉温暖的人情味。广州的恋人正是“低调有实力、贴心不张扬”的代名词——不搞虚头巴脑的排场，却会在换季提醒你添衣、周末拉你去叹一盅两件，把“好好过日子”变成最高级的情话。',
      hiddenStrength:
        '你拥有超强的“生活落地能力”。别人谈恋爱停留在想象里，而你擅长把爱意拆解成每一餐饭、每一次回应和共同的未来规划，让人无比踏实。',
      easterEgg: {
        scene: '周末清晨的西关老茶楼，窗外木棉初开，TA顺手帮你烫好茶杯，把刚出笼的虾饺夹到你碗里。',
        token: '一只精致的广彩小茶杯 & 一份手写私藏糖水铺清单',
        code: '“得闲饮茶啦，今天炖了你最喜欢的椰子鸡汤。”'
      }
    },
    {
      id: 'shenzhen',
      name: '深圳',
      pinyin: 'SHENZHEN',
      region: '广东 · 南海之滨',
      geoZone: '华南',
      coords: '22°32′N · 114°03′E',
      seal: '鹏城同频',
      title: '锐意同频的未来造梦合伙人',
      accent: '#2D6B7C',
      secondary: '#C98948',
      quote: '“风从南海吹来，深圳的宿命恋人不懂陈规旧俗，只想和你一起把野心、海风与未来全部拿下。”',
      profile: { warmth: 40, poetry: 28, passion: 72, freedom: 82, ambition: 96, steadfast: 56 },
      traits: ['面向未来', '高效直接', '年轻锐气', '成长型伴侣'],
      matchReason:
        '你的「摩登锋芒」「旷达山野」与「炽热直球」格外醒目！你崇尚效率与真诚，讨厌论资排辈和无谓客套，骨子里流淌着“敢闯敢试”的先锋血液。深圳的宿命恋人同样明亮、直接、充满向上生长的能量——你们可以白天一起讨论新点子、彼此启发，周末开车一小时去大鹏湾看果冻海，把爱情谈成一场激动人心的共同进化。',
      hiddenStrength:
        '你拥有稀缺的“未来感与反内耗基因”。你很少沉溺于过去的遗憾，总是目光向前、行动敏捷，能带给伴侣源源不断的新视野与破局勇气。',
      easterEgg: {
        scene: '深圳湾公园的粉色晚霞里，海风拂过棕榈树影，你们刚聊完一个天马行空的未来计划，决定顺路去盐田海边看星星。',
        token: '一张海滨栈道落日抓拍 & 一枚极简金属行李牌',
        code: '“想法太棒了！别等以后，我们现在就开始吧。”'
      }
    },
    {
      id: 'xiamen',
      name: '厦门',
      pinyin: 'XIAMEN',
      region: '福建 · 鹭岛海峡',
      geoZone: '华南',
      coords: '24°29′N · 118°05′E',
      seal: '鹭岛橘海',
      title: '干净温柔的橘子海慢调恋人',
      accent: '#C86D58',
      secondary: '#56808A',
      quote: '“如果温柔有具体的形状，那一定是厦门环岛路的橘色日落，和你眼里恰好倒映的海浪。”',
      profile: { warmth: 76, poetry: 92, passion: 34, freedom: 80, ambition: 34, steadfast: 60 },
      traits: ['清甜温柔', '浪漫具象化', '慢调治愈', '细腻有灵气'],
      matchReason:
        '你在「诗意清雅」「旷达山野」与「烟火松弛」上的高契合度，说明你内心住着一个极其温柔、注重氛围与美感的浪漫主义者。厦门的恋人恰如鼓浪屿飘来的钢琴声与环岛路的咸甜海风——干净、温和、不急不躁，懂得把平常的散步、看海、喝工夫茶，都变成像偶像剧帧率一样值得珍藏的瞬间。',
      hiddenStrength:
        '你有着点亮日常的“温柔滤镜力”。再普通的街角、再平凡的傍晚，只要经由你的眼睛发现并分享，就会拥有让人心头一软的浪漫质感。',
      easterEgg: {
        scene: '黄厝海滩退潮后的傍晚，天空被染成温柔的橘粉色，TA蹲下来悄悄拾起一枚完整的海螺放进你的手心。',
        token: '一枚听得见浪声的小白螺 & 一张鼓浪屿手绘转角地图',
        code: '“今天的日落像极了橘子汽水，刚好想和你一起看。”'
      }
    }
  ];

  return {
    DIMENSIONS,
    CHAPTERS,
    QUESTIONS,
    CITIES
  };
})();
