// E16カードバトラー - ゲームロジック v2.0
// キャラクター + ブースター + トラップ + 状態異常カード対応

// カードデータベース
const CARD_DATABASE = [
    // ==================== キャラクターカード ====================
    
    // AURALIS メンバー
    {
        id: 'mina',
        name: 'ミナ・エウレカ・アーネスト',
        faction: 'AURALIS',
        cardType: 'character',
        type: 'strategy',
        attack: 4,
        defense: 5,
        cost: 3,
        ability: '次元操作: 相手の盾を2減少させる',
        description: 'E528年の現在も活動を続けるAURALIS第二代総合プロデューサー。青き長身の才女。',
        image: 'images/Mina Eureka Ernst.png',
        era: 'E522-'
    },
    {
        id: 'layla',
        name: 'レイラ・ヴィレル・ノヴァ',
        faction: 'AURALIS',
        cardType: 'character',
        type: 'warrior',
        attack: 8,
        defense: 4,
        cost: 5,
        ability: 'Pink Voltage: 攻撃力+3 但し自身にも2ダメージ',
        description: 'Pink Voltageの異名を持つ最強戦士。凍眠保存から復活し今も戦う。',
        image: 'images/Layla Virel Nova.png',
        era: 'E325-'
    },
    {
        id: 'kate',
        name: 'ケイト・パットン',
        faction: 'AURALIS',
        cardType: 'character',
        type: 'support',
        attack: 2,
        defense: 7,
        cost: 2,
        ability: '大地の安定: 味方に盾+2',
        description: '「大地の豊かさ・安定」を体現する。第二代。AURALISの基盤担当。',
        image: 'images/Kate Patton.png',
        era: 'E514-'
    },
    {
        id: 'lillie',
        name: 'リリー・アーデント',
        faction: 'AURALIS',
        cardType: 'character',
        type: 'art',
        attack: 3,
        defense: 4,
        cost: 2,
        ability: '情熱増幅: 次の味方の攻撃を2倍にする',
        description: '「情熱的で大胆」な芸術家。第二代。感情増幅担当。',
        image: 'images/Lillie Ardent.png',
        era: 'E514-'
    },
    {
        id: 'ninny',
        name: 'ニニー・オフェンバック',
        faction: 'AURALIS',
        cardType: 'character',
        type: 'speed',
        attack: 5,
        defense: 2,
        cost: 2,
        ability: '爆発活力: 召喚時、ランダムな味方を+2',
        description: '無邪気で爆発的な活力を持つ。Gigapolisに再帰還した存在。',
        image: 'images/Ninny Offenbach.png',
        era: 'E514-'
    },

    // Gigapolis / 戦士
    {
        id: 'jen',
        name: 'Jen',
        faction: 'Gigapolis',
        cardType: 'character',
        type: 'elite',
        attack: 9,
        defense: 8,
        cost: 6,
        ability: 'Valoriaの守護者: HPが30%以下で攻撃力2倍',
        description: 'Valoria宮殿を掌握するLv.938+の最強戦士。200年以上 activo.',
        emoji: '🏰',
        era: 'E319-'
    },
    {
        id: 'alpha_kane',
        name: 'アルファ・ケイン',
        faction: 'Gigapolis',
        cardType: 'character',
        type: 'warrior',
        attack: 7,
        defense: 5,
        cost: 4,
        ability: '戦士決定戦覇者: 召喚時相手に3ダメージ',
        description: '戦士決定戦の元チャンピオン。ネオクラン同盟の основатель.',
        emoji: '⚔️',
        era: 'E301-318'
    },
    {
        id: 'selia',
        name: 'セリア・ドミニクス',
        faction: 'Gigapolis',
        cardType: 'character',
        type: 'ruler',
        attack: 6,
        defense: 6,
        cost: 5,
        ability: '黄金時代: 自分の盾+4、攻撃+2',
        description: 'Selinopolis創設者。テリアン運動の精神的支柱。',
        emoji: '👑',
        era: 'E335-370'
    },
    {
        id: '弦太郎',
        name: '弦太郎',
        faction: 'Gigapolis',
        cardType: 'character',
        type: 'feminine_hero',
        attack: 6,
        defense: 5,
        cost: 4,
        ability: 'Valoria流派: 味方の盾+2',
        description: 'Lv.569。Valoria連合圏所属のフェミニン・ヒーロー。Jenの後輩兼ライバル。',
        emoji: '🌸',
        era: 'E400-'
    },

    // トリニティ / V7
    {
        id: 'iris',
        name: 'アイリス',
        faction: 'トリニティ',
        cardType: 'character',
        type: 'ruler',
        attack: 8,
        defense: 7,
        cost: 6,
        ability: 'Vaermillionの支配者: 毎ターン+1/+1',
        description: 'Vaermillion首脳。IRISランキング1位。トリニティ指導者。',
        emoji: '🌸',
        era: 'E500-'
    },
    {
        id: 'fiona',
        name: 'フィオナ',
        faction: 'V7',
        cardType: 'character',
        type: 'warrior',
        attack: 7,
        defense: 4,
        cost: 4,
        ability: 'スパッツ外交: 攻撃時相手の盾無視',
        description: 'ブルー・ローズ統率者。V7急先鋒。IRISランキング2位。',
        emoji: '🌹',
        era: 'E500-'
    },
    {
        id: 'marina',
        name: 'マリーナ・ボビン',
        faction: 'V7',
        cardType: 'character',
        type: 'support',
        attack: 3,
        defense: 8,
        cost: 3,
        ability: 'ミエルテンガ総統: 味方に盾+3',
        description: 'ミエルテンガ総統。IRISランキング3位。',
        emoji: '🎖️',
        era: 'E500-'
    },
    {
        id: 'sebastian',
        name: 'セバスチャン・ヴァレリウス',
        faction: 'V7',
        cardType: 'character',
        type: 'elite',
        attack: 8,
        defense: 5,
        cost: 5,
        ability: 'ボグダスジャベリン: 召喚時3ダメージ',
        description: 'ボグダス・ジャベリンリーダー。テクロサスの正統後継者。',
        emoji: '🗡️',
        era: 'E490-'
    },
    {
        id: 'kastina',
        name: 'カスチーナ・テンペスト',
        faction: 'V7',
        cardType: 'character',
        type: 'mage',
        attack: 5,
        defense: 6,
        cost: 4,
        ability: '嵐の召喚: 相手全員に2ダメージ',
        description: 'クロセヴィア首脳。IRISランキング5位。',
        emoji: '⚡',
        era: 'E500-'
    },

    // Alpha Venom
    {
        id: 'alpha_venom',
        name: 'アルファ・ヴェノム',
        faction: 'Alpha Venom',
        cardType: 'character',
        type: 'villain',
        attack: 9,
        defense: 6,
        cost: 6,
        ability: '闇の支配: 相手全体3ダメージ',
        description: '両陣営共通の敵。エヴァトロンΣ-Unitの後継者。',
        emoji: '🦠',
        era: 'E500-'
    },
    {
        id: 'sigma_unit',
        name: 'Σ-ユニット',
        faction: 'Alpha Venom',
        cardType: 'character',
        type: 'soldier',
        attack: 5,
        defense: 4,
        cost: 3,
        ability: '精神操作: 相手の手札1枚DISCARD',
        description: '精神操作・生体改造技術を持つ極秘部隊。',
        emoji: '💀',
        era: 'E420-'
    },
    {
        id: 'golden_venom',
        name: 'ゴールデン・ヴェノム',
        faction: 'Alpha Venom',
        cardType: 'character',
        type: 'terrorist',
        attack: 7,
        defense: 3,
        cost: 4,
        ability: '自爆: 召喚時自分に5ダメージ、相手全員3ダメージ',
        description: 'アルファ・ヴェノムから分裂したテロ組織。',
        emoji: '☠️',
        era: 'E500-'
    },

    // 歴史的英雄
    {
        id: 'timur',
        name: 'ティムール・シャー',
        faction: '歴史',
        cardType: 'character',
        type: 'founder',
        attack: 5,
        defense: 6,
        cost: 4,
        ability: '10次元ホラズム: 次元の扉、盾+5',
        description: '10次元ホラズム理論提唱者。移民団リーダー。ペルセポネ設計者。',
        emoji: '🌌',
        era: 'E0-'
    },
    {
        id: 'temirtaron',
        name: 'テミルタロン',
        faction: '歴史',
        cardType: 'character',
        type: 'sage',
        attack: 4,
        defense: 5,
        cost: 4,
        ability: 'サイケコスモ: 全員+1/+1',
        description: 'サイケデリック・コスモロジー提唱者。次元理論の完成者。',
        emoji: '🔮',
        era: 'E80-90'
    },
    {
        id: 'el_forhouse',
        name: 'エル・フォルハウス',
        faction: '歴史',
        cardType: 'character',
        type: 'reformer',
        attack: 4,
        defense: 4,
        cost: 3,
        ability: 'マーストリヒト革命: 相手盾-3、自分盾+3',
        description: '「新時代のルーキー」。自由経済を確立した革命指導者。',
        emoji: '📜',
        era: 'E150'
    },
    {
        id: 'sylvia',
        name: 'シルヴィア・クロウ',
        faction: 'Eros-7',
        cardType: 'character',
        type: 'esper',
        attack: 6,
        defense: 5,
        cost: 4,
        ability: 'エスパー能力: 相手の手札ランダム1枚破棄',
        description: 'エスパー能力者。スライム危機を解決した女性リーダー。',
        emoji: '👁️',
        era: 'E101-'
    },
    {
        id: 'ayaka',
        name: 'アヤカ・リン',
        faction: 'Eros-7',
        cardType: 'character',
        type: 'hero',
        attack: 7,
        defense: 4,
        cost: 4,
        ability: 'ビキニバリア: 自身に盾+4、攻撃+2',
        description: 'Lv.842のハンター。ビキニブリーフス・スーパーヒーロー。',
        emoji: '🛡️',
        era: 'E380-'
    },
    {
        id: 'lilith',
        name: 'リリス・ヴェイン',
        faction: 'Eros-7',
        cardType: 'character',
        type: 'founder',
        attack: 3,
        defense: 6,
        cost: 3,
        ability: '搾取の支配者: 自分の盾+3、攻撃+1',
        description: 'Eros-7初期リーダー。搾取生物技術を確立した。',
        emoji: '🕷️',
        era: 'E0-'
    },
    {
        id: 'tina_gue',
        name: 'Tina / Gue',
        faction: 'Gigapolis',
        cardType: 'character',
        type: 'underground',
        attack: 6,
        defense: 6,
        cost: 4,
        ability: '地下支配: 召喚時相手の手札1枚破棄',
        description: 'E400年以降、Gigapolis地下街最深部を実効支配。',
        emoji: '🕳️',
        era: 'E400-'
    },

    // Slime Woman / 特殊
    {
        id: 'slime_woman',
        name: 'スライム・ウィメン',
        faction: '特殊',
        cardType: 'character',
        type: 'dimensional',
        attack: 8,
        defense: 3,
        cost: 5,
        ability: '次元干渉: 相手盾半減（端数切捨て）',
        description: '高次元世界から顕現した存在。E340年の実験事故で出現。',
        emoji: '🟣',
        era: 'E340-'
    },

    // ==================== ブースターカード ====================
    // 技術・事件ベースの強化カード

    {
        id: 'booster_dimension_horizon',
        name: '次元極地平',
        faction: '技術',
        cardType: 'booster',
        type: 'technology',
        effect: '次元の扉が開く。味方の攻撃力を+3。',
        cost: 2,
        ability: '味方全員: ATK+3',
        description: '量子重力場を操作して高次元空間にアクセスする技術。',
        emoji: '🌌',
        era: 'E80-'
    },
    {
        id: 'booster_persephone',
        name: 'ペルセポネ',
        faction: '技術',
        cardType: 'booster',
        type: 'virtual',
        effect: '仮想多元宇宙。味方に盾+4。',
        cost: 3,
        ability: '味方全員: DEF+4',
        description: 'ティムール・シャー設計の仮想多元宇宙システム。',
        emoji: '🔮',
        era: 'E0-'
    },
    {
        id: 'booster_n_token',
        name: 'nトークン経済',
        faction: '技術',
        cardType: 'booster',
        type: 'economy',
        effect: '量子暗号化通貨。HP+5、盾+2。',
        cost: 2,
        ability: '自分: HP+5, DEF+2',
        description: 'E16星系の基本通貨システム。',
        emoji: '💰',
        era: 'E150-'
    },
    {
        id: 'booster_qualia_core',
        name: 'クオリア・コア',
        faction: '技術',
        cardType: 'booster',
        type: 'consciousness',
        effect: '意識と技術の完全融合。全員+2/+2。',
        cost: 4,
        ability: '全員: ATK+2, DEF+2',
        description: '感情をデジタル化する技術。',
        emoji: '💫',
        era: 'E350-'
    },
    {
        id: 'booster_squeezing_tech',
        name: '搾取テクノロジー',
        faction: 'Eros-7',
        cardType: 'booster',
        type: 'bio',
        effect: '搾取生物技術。味方の攻撃+4、盾+2。',
        cost: 3,
        ability: '味方1体: ATK+4, DEF+2',
        description: '性的エネルギーを抽出・変換する技術。',
        emoji: '🕷️',
        era: 'E0-'
    },
    {
        id: 'booster_nanocell',
        name: 'ナノセル・インプラント',
        faction: '技術',
        cardType: 'booster',
        type: 'cybernetic',
        effect: 'サイバネティクス強化。自身のDEF+5。',
        cost: 3,
        ability: '自分: DEF+5',
        description: '体内に埋め込むナノボット。',
        emoji: '⚙️',
        era: 'E80-'
    },
    {
        id: 'booster_apolonium',
        name: 'アポロニウム',
        faction: '技術',
        cardType: 'booster',
        type: 'dimensional',
        effect: '次元触媒物質。相手に3ダメージ。',
        cost: 3,
        ability: '相手: 3ダメージ',
        description: 'アポロ文明開発の次元触媒。時相放送の鍵。',
        emoji: '✨',
        era: 'E390-'
    },
    {
        id: 'booster_warrior_battle',
        name: '戦士決定戦',
        faction: 'Gigapolis',
        cardType: 'booster',
        type: 'event',
        effect: 'ネオンコロシアム決戦。味方の攻撃+5。',
        cost: 3,
        ability: '味方1体: ATK+5',
        description: 'Gigapolisの国民的イベント。',
        emoji: '⚔️',
        era: 'E150-'
    },
    {
        id: 'booster_maastricht',
        name: 'マーストリヒト革命',
        faction: '歴史',
        cardType: 'booster',
        type: 'event',
        effect: '自由経済確立。相手盾-4、自分盾+4。',
        cost: 2,
        ability: '相手: DEF-4, 自分: DEF+4',
        description: 'エル・フォルハウスによる革命。',
        emoji: '📜',
        era: 'E150'
    },
    {
        id: 'booster_slime_crisis',
        name: 'スライム危機',
        faction: '歴史',
        cardType: 'booster',
        type: 'event',
        effect: '変異スライム大発生。相手全体3ダメージ。',
        cost: 3,
        ability: '相手全員: 3ダメージ',
        description: 'E380-400年の未曾有の災害。',
        emoji: '🟢',
        era: 'E380-400'
    },
    {
        id: 'booster_golden_age',
        name: 'セリア黄金期',
        faction: 'Gigapolis',
        cardType: 'booster',
        type: 'event',
        effect: 'Fermi音楽・nトークン経済的最盛期。全員+2/+2。',
        cost: 4,
        ability: '全員: ATK+2, DEF+2',
        description: 'E335-370年の繁栄的时代。',
        emoji: '🌟',
        era: 'E335-370'
    },
    {
        id: 'booster_liminal_forge',
        name: 'リミナル・フォージ',
        faction: 'AURALIS',
        cardType: 'booster',
        type: 'broadcast',
        effect: '時相放送。全員+3/+0。',
        cost: 4,
        ability: '味方全員: ATK+3',
        description: 'E528年から地球2026年への時相放送プロジェクト。',
        emoji: '📡',
        era: 'E525-'
    },

    // ==================== トラップカード ====================
    // 罠・防御・妨害カード

    {
        id: 'trap_dimension_collapse',
        name: '次元崩壊',
        faction: '特殊',
        cardType: 'trap',
        type: 'counter',
        effect: '相手全員-3/-3。',
        cost: 3,
        ability: '相手全員: ATK-3, DEF-3',
        description: '高次元世界の崩壊を誘発する。',
        emoji: '💥',
        era: 'E340-'
    },
    {
        id: 'trap_evatron_suppression',
        name: 'エヴァトロン弾圧',
        faction: 'Alpha Venom',
        cardType: 'trap',
        type: 'control',
        effect: '相手の手札2枚破棄。',
        cost: 4,
        ability: '相手: 手札2枚破棄',
        description: '文化・技術の抑圧政策。',
        emoji: '🚫',
        era: 'E400-475'
    },
    {
        id: 'trap_slime_infection',
        name: 'スライム感染',
        faction: '特殊',
        cardType: 'trap',
        type: 'bio_hazard',
        effect: '相手1体に感染。毎ターン-1/-1。',
        cost: 2,
        ability: '相手1体: ATK-1, DEF-1 (永続)',
        description: '変異スライムによる感染。',
        emoji: '🟣',
        era: 'E380-'
    },
    {
        id: 'trap_energy_depletion',
        name: 'エネルギー枯渇',
        faction: 'Eros-7',
        cardType: 'trap',
        type: 'drain',
        effect: '相手の盾3減少。自分HP+3。',
        cost: 2,
        ability: '相手: DEF-3, 自分: HP+3',
        description: '性的エネルギー抽出の副作用。',
        emoji: '🔋',
        era: 'E0-'
    },
    {
        id: 'trap_mental_manipulation',
        name: '精神操作',
        faction: 'Alpha Venom',
        cardType: 'trap',
        type: 'mind_control',
        effect: '相手の手札1枚自分のものに。',
        cost: 3,
        ability: '相手手札1枚を自分に移動',
        description: 'Σ-ユニットの特殊技術。',
        emoji: '🧠',
        era: 'E420-'
    },
    {
        id: 'trap_neon_colosseum',
        name: 'ネオンコロシアム',
        faction: 'Gigapolis',
        cardType: 'trap',
        type: 'arena',
        effect: '味方に盾+5。相手の攻撃-2。',
        cost: 3,
        ability: '味方: DEF+5, 相手: ATK-2',
        description: '戦士決定戦の舞台。',
        emoji: '🏟️',
        era: 'E150-'
    },
    {
        id: 'trap_bio_barrier',
        name: 'バイオバリア',
        faction: 'Eros-7',
        cardType: 'trap',
        type: 'defense',
        effect: '味方に盾+6。',
        cost: 3,
        ability: '味方1体: DEF+6',
        description: 'ナノテクノロジーによる防御壁。',
        emoji: '🛡️',
        era: 'E150-'
    },
    {
        id: 'trap_quick_reflex',
        name: 'クイックリフレックス',
        faction: 'AURALIS',
        cardType: 'trap',
        type: 'counter',
        effect: '相手アタックを反射。自身に2ダメージ。',
        cost: 1,
        ability: '攻撃を無効化、自身2ダメージ',
        description: '反射神経を生かしたカウンター。',
        emoji: '⚡',
        era: 'E300-'
    },

    // ==================== 状態異常カード ====================
    // デバフ・状態変化カード

    {
        id: 'status_slime_wound',
        name: 'スライム傷',
        faction: '特殊',
        cardType: 'status',
        type: 'poison',
        effect: '毎ターン-2/-1。3ターン継続。',
        duration: 3,
        cost: 1,
        ability: '毎ターン: ATK-2, DEF-1',
        description: 'スライムの酸による腐食。',
        emoji: '☠️',
        era: 'E380-'
    },
    {
        id: 'status_radiation_exposure',
        name: '放射線被曝',
        faction: '技術',
        cardType: 'status',
        type: 'radiation',
        effect: 'DEF-3。回復不能。',
        cost: 2,
        ability: 'DEF-3 (永続)',
        description: '高エネルギー粒子による被曝。',
        emoji: '☢️',
        era: 'E1-'
    },
    {
        id: 'status_cyber_corruption',
        name: 'サイバー汚染',
        faction: 'Alpha Venom',
        cardType: 'status',
        type: 'virus',
        effect: '能力が使用不能。',
        cost: 3,
        ability: '能力封じ',
        description: 'ナノボットによる意識改変。',
        emoji: '🦠',
        era: 'E420-'
    },
    {
        id: 'status_energy_addiction',
        name: 'エネルギー依存',
        faction: 'Eros-7',
        cardType: 'status',
        type: 'addiction',
        effect: '毎ターンHP-2。',
        duration: 5,
        cost: 1,
        ability: '毎ターン: HP-2',
        description: '搾取生物への依存症。',
        emoji: '💉',
        era: 'E0-'
    },
    {
        id: 'status_temporal_distortion',
        name: '時間軸歪み',
        faction: '技術',
        cardType: 'status',
        type: 'time',
        effect: '次のターン行動不能。',
        cost: 3,
        ability: '1ターン行動不可',
        description: '時相放送の副作用。',
        emoji: '⏰',
        era: 'E525-'
    },
    {
        id: 'status_bio_boost',
        name: ' 바이오ブースター',
        faction: 'Eros-7',
        cardType: 'status',
        type: 'enhancement',
        effect: 'ATK+4、DEF+2。3ターン。',
        duration: 3,
        cost: 2,
        ability: 'ATK+4, DEF+2 (3ターン)',
        description: '遺伝子改変による一時的強化。',
        emoji: '💪',
        era: 'E80-'
    },
    {
        id: 'status_shield_field',
        name: 'Shield Field',
        faction: 'Gigapolis',
        cardType: 'status',
        type: 'shield',
        effect: 'DEF+5。盾として機能。',
        duration: 4,
        cost: 2,
        ability: 'DEF+5 (4ターン)',
        description: 'ナノテクノロジーによる防御場。',
        emoji: '🛡️',
        era: 'E80-'
    },
    {
        id: 'status_warp_speed',
        name: '曲率加速',
        faction: '技術',
        cardType: 'status',
        type: 'speed',
        effect: 'ATK+3。再攻撃可能。',
        duration: 2,
        cost: 2,
        ability: 'ATK+3, 再攻撃 (2ターン)',
        description: '曲率航法による速度向上。',
        emoji: '🚀',
        era: 'E1-'
    },
    {
        id: 'status_dimension_lock',
        name: '次元ロック',
        faction: '技術',
        cardType: 'status',
        type: 'seal',
        effect: '対象行動不能3ターン。',
        duration: 3,
        cost: 4,
        ability: '3ターン行動不可',
        description: '高次元による空間固定。',
        emoji: '🔒',
        era: 'E80-'
    },
    {
        id: 'status_hero_resolve',
        name: 'ヒーロー覚悟',
        faction: 'Gigapolis',
        cardType: 'status',
        type: 'morale',
        effect: 'HP20%以下でATK+5、DEF+3。',
        cost: 2,
        ability: 'HP20%以下: ATK+5, DEF+3',
        description: '危機における覚醒。',
        emoji: '🔥',
        era: 'E150-'
    }
];

// ゲーム状態
let gameState = {
    playerHP: 30,
    opponentHP: 30,
    playerShield: 0,
    opponentShield: 0,
    playerHand: [],
    opponentHand: [],
    playerField: [],
    opponentField: [],
    playerDeck: [],
    opponentDeck: [],
    turn: 'player',
    isPlayerTurn: true,
    selectedCard: null,
    gold: 1000,
    isGameOver: false,
    turnCount: 0
};

// DOM要素
const screens = {
    menu: document.getElementById('menu-screen'),
    game: document.getElementById('game-screen'),
    deck: document.getElementById('deck-screen'),
    collection: document.getElementById('collection-screen'),
    lore: document.getElementById('lore-screen')
};

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    loadPlayerData();
    renderCardShowcase();
    setupEventListeners();
});

// セーブデータ読み込み
function loadPlayerData() {
    const saved = localStorage.getItem('e16cardgame');
    if (saved) {
        const data = JSON.parse(saved);
        gameState.gold = data.gold || 1000;
        document.getElementById('player-gold').textContent = gameState.gold;
    }
}

// セーブデータ保存
function savePlayerData() {
    localStorage.setItem('e16cardgame', JSON.stringify({
        gold: gameState.gold
    }));
}

// スクリーン切り替え
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// メニューに戻る
function returnToMenu() {
    showScreen('menu');
    updateGoldDisplay();
}

// ゲームスタート
function startGame() {
    gameState = {
        ...gameState,
        playerHP: 30,
        opponentHP: 30,
        playerShield: 0,
        opponentShield: 0,
        playerHand: [],
        opponentHand: [],
        playerField: [],
        opponentField: [],
        turn: 'player',
        isPlayerTurn: true,
        selectedCard: null,
        isGameOver: false,
        turnCount: 0
    };

    // デッキ作成
    gameState.playerDeck = createDeck();
    gameState.opponentDeck = createDeck();

    // 初期手札
    for (let i = 0; i < 5; i++) {
        drawCard('player');
        drawCard('opponent');
    }

    showScreen('game');
    updateGameUI();
    addLog('ゲーム開始！あなたのターンです。');
}

// デッキ作成（ランダム25枚：キャラクター+特殊カード混合）
function createDeck() {
    const chars = CARD_DATABASE.filter(c => c.cardType === 'character');
    const boosters = CARD_DATABASE.filter(c => c.cardType === 'booster');
    const traps = CARD_DATABASE.filter(c => c.cardType === 'trap');
    const statuses = CARD_DATABASE.filter(c => c.cardType === 'status');
    
    const deck = [
        ...shuffle(chars).slice(0, 12),
        ...shuffle(boosters).slice(0, 5),
        ...shuffle(traps).slice(0, 4),
        ...shuffle(statuses).slice(0, 4)
    ];
    
    return shuffle(deck);
}

function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// カードを描く
function drawCard(who) {
    const deck = who === 'player' ? gameState.playerDeck : gameState.opponentDeck;
    const hand = who === 'player' ? gameState.playerHand : gameState.opponentHand;

    if (deck.length > 0 && hand.length < 7) {
        const card = deck.pop();
        hand.push(card);
    }
}

// カードを描画（画像対応）
function renderCard(card, isInHand = false, isDisabled = false) {
    const cardEl = document.createElement('div');
    cardEl.className = `game-card ${isInHand ? 'hand-card' : ''} ${isDisabled ? 'disabled' : ''} card-type-${card.cardType}`;
    cardEl.dataset.cardId = card.id;

    // 画像または絵文字
    const imageHtml = card.image 
        ? `<img src="${card.image}" alt="${card.name}" class="card-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
           <span class="card-emoji-fallback" style="display:none;">${card.emoji || '🃏'}</span>`
        : `<span class="card-emoji">${card.emoji || '🃏'}</span>`;

    // ブースター/トラップ/状態異常の特別表示
    let statsHtml = '';
    if (card.cardType === 'character') {
        statsHtml = `
            <div class="card-stats">
                <span class="card-attack">⚔️${card.attack}</span>
                <span class="card-defense">🛡️${card.defense}</span>
            </div>
        `;
    } else {
        statsHtml = `
            <div class="card-effect">${card.ability}</div>
        `;
    }

    cardEl.innerHTML = `
        <div class="card-header ${card.cardType}">${card.faction}</div>
        <div class="card-art">${imageHtml}</div>
        ${statsHtml}
    `;

    if (!isInHand) {
        cardEl.addEventListener('click', () => selectFieldCard(card, cardEl));
    } else {
        cardEl.addEventListener('click', () => selectHandCard(card, cardEl));
        // ダブルクリックでプレイ
        cardEl.addEventListener('dblclick', () => playCard(card));
    }

    // モーダル表示
    cardEl.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showCardModal(card);
    });

    return cardEl;
}

// 手札カード選択
function selectHandCard(card, element) {
    if (!gameState.isPlayerTurn || gameState.isGameOver) return;

    if (gameState.playerHand.length >= 7) {
        addLog('手札が一杯です！');
        return;
    }

    document.querySelectorAll('.game-card.selected').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    gameState.selectedCard = card;

    addLog(`${card.name}を選択しました。ダブルクリックで場に。`);
}

// フィールドカード選択（攻撃用）
function selectFieldCard(card, element) {
    if (!gameState.isPlayerTurn || gameState.isGameOver) return;
    if (gameState.opponentField.length === 0 && card.cardType === 'character') return;

    document.querySelectorAll('.game-card.selected').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    gameState.selectedCard = card;
    
    if (card.cardType === 'character') {
        addLog(`${card.name}で攻撃します！`);
    } else {
        addLog(`${card.name}を発動します！`);
    }
}

// カードを出す
function playCard(card) {
    if (!gameState.selectedCard) return;

    const index = gameState.playerHand.findIndex(c => c.id === card.id);
    if (index === -1) return;

    gameState.playerHand.splice(index, 1);

    if (card.cardType === 'character') {
        gameState.playerField.push(card);
        addLog(`${card.name}を出した！ (${card.emoji || '🃏'} ATK:${card.attack} DEF:${card.defense})`);
    } else if (card.cardType === 'booster') {
        activateBooster(card, 'player');
        addLog(`ブースター発動: ${card.name}！`);
    } else if (card.cardType === 'trap') {
        activateTrap(card, 'player');
        addLog(`トラップ発動: ${card.name}！`);
    } else if (card.cardType === 'status') {
        if (gameState.opponentField.length > 0) {
            const target = gameState.opponentField[0];
            applyStatus(card, target, 'opponent');
            addLog(`状態異常付与: ${card.name} → ${target.name}！`);
        } else {
            addLog('対象がいません！');
            return;
        }
    }

    activateAbility(card, 'player');
    gameState.selectedCard = null;
    updateGameUI();
    checkGameOver();
}

// ブースター発動
function activateBooster(card, owner) {
    const field = owner === 'player' ? gameState.playerField : gameState.opponentField;
    const opponentField = owner === 'player' ? gameState.opponentField : gameState.playerField;
    const opponentShield = owner === 'player' ? gameState.opponentShield : gameState.playerShield;
    const selfShield = owner === 'player' ? gameState.playerShield : gameState.opponentShield;
    const selfHP = owner === 'player' ? gameState.playerHP : gameState.opponentHP;

    const ability = card.ability;

    if (ability.includes('自分: HP+')) {
        const heal = parseInt(ability.match(/HP\+(\d+)/)?.[1] || '0');
        if (owner === 'player') gameState.playerHP = Math.min(30, gameState.playerHP + heal);
        else gameState.opponentHP = Math.min(30, gameState.opponentHP + heal);
    }

    if (ability.includes('自分: DEF+')) {
        const def = parseInt(ability.match(/DEF\+(\d+)/)?.[1] || '0');
        if (owner === 'player') gameState.playerShield += def;
        else gameState.opponentShield += def;
    }

    if (ability.includes('相手: DEF-')) {
        const def = parseInt(ability.match(/DEF-(\d+)/)?.[1] || '0');
        if (owner === 'player') gameState.opponentShield = Math.max(0, gameState.opponentShield - def);
        else gameState.playerShield = Math.max(0, gameState.playerShield - def);
    }

    if (ability.includes('相手: 3ダメージ')) {
        dealDamage(owner === 'player' ? 'opponent' : 'player', 3);
    }

    if (ability.includes('全員: ATK+') || ability.includes('全員: DEF+')) {
        field.forEach(c => {
            if (c.cardType === 'character') {
                if (ability.includes('ATK+')) {
                    const atk = parseInt(ability.match(/ATK\+(\d+)/)?.[1] || '0');
                    c.attack += atk;
                }
                if (ability.includes('DEF+')) {
                    const def = parseInt(ability.match(/DEF\+(\d+)/)?.[1] || '0');
                    c.defense += def;
                }
            }
        });
    }

    if (ability.includes('味方1体:') || ability.includes('味方全員:')) {
        const isAll = ability.includes('全員');
        const targets = isAll ? field.filter(c => c.cardType === 'character') : field.filter(c => c.cardType === 'character').slice(0, 1);
        
        targets.forEach(c => {
            if (ability.includes('ATK+')) {
                const atk = parseInt(ability.match(/ATK\+(\d+)/)?.[1] || '0');
                c.attack += atk;
            }
            if (ability.includes('DEF+')) {
                const def = parseInt(ability.match(/DEF\+(\d+)/)?.[1] || '0');
                c.defense += def;
            }
        });
    }
}

// トラップ発動
function activateTrap(card, owner) {
    const opponentHand = owner === 'player' ? gameState.opponentHand : gameState.playerHand;
    const opponentShield = owner === 'player' ? gameState.opponentShield : gameState.playerShield;
    const selfShield = owner === 'player' ? gameState.playerShield : gameState.opponentShield;
    const selfHP = owner === 'player' ? gameState.playerHP : gameState.opponentHP;

    if (card.ability.includes('相手全員: ATK-')) {
        const atk = parseInt(card.ability.match(/ATK-(\d+)/)?.[1] || '0');
        const oppField = owner === 'player' ? gameState.opponentField : gameState.playerField;
        oppField.filter(c => c.cardType === 'character').forEach(c => c.attack = Math.max(0, c.attack - atk));
    }

    if (card.ability.includes('相手全員: DEF-')) {
        const def = parseInt(card.ability.match(/DEF-(\d+)/)?.[1] || '0');
        const oppField = owner === 'player' ? gameState.opponentField : gameState.playerField;
        oppField.filter(c => c.cardType === 'character').forEach(c => c.defense = Math.max(0, c.defense - def));
    }

    if (card.ability.includes('相手: 手札')) {
        const count = parseInt(card.ability.match(/(\d+)枚/)?.[1] || '1');
        for (let i = 0; i < count && opponentHand.length > 0; i++) {
            const idx = Math.floor(Math.random() * opponentHand.length);
            const discarded = opponentHand.splice(idx, 1)[0];
            addLog(`${owner === 'player' ? '相手' : 'あなた'}の${discarded.name}が破棄された！`);
        }
    }

    if (card.ability.includes('自分: HP+')) {
        const heal = parseInt(card.ability.match(/HP\+(\d+)/)?.[1] || '0');
        if (owner === 'player') gameState.playerHP = Math.min(30, gameState.playerHP + heal);
        else gameState.opponentHP = Math.min(30, gameState.opponentHP + heal);
    }

    if (card.ability.includes('味方: DEF+')) {
        const def = parseInt(card.ability.match(/DEF\+(\d+)/)?.[1] || '0');
        const field = owner === 'player' ? gameState.playerField : gameState.opponentField;
        if (field.length > 0) {
            field[0].defense += def;
        }
    }

    if (card.ability.includes('相手: ATK-')) {
        const atk = parseInt(card.ability.match(/ATK-(\d+)/)?.[1] || '0');
        const oppField = owner === 'player' ? gameState.opponentField : gameState.playerField;
        if (oppField.length > 0) {
            oppField[0].attack = Math.max(0, oppField[0].attack - atk);
        }
    }
}

// 状態異常適用
function applyStatus(card, target, owner) {
    if (target.cardType !== 'character') return;
    
    target.statusEffects = target.statusEffects || [];
    target.statusEffects.push({
        id: card.id,
        name: card.name,
        duration: card.duration || 99,
        effect: card.ability
    });
}

// 能力発動
function activateAbility(card, owner) {
    switch(card.id) {
        case 'el_forhouse':
            if (owner === 'player') {
                gameState.opponentShield = Math.max(0, gameState.opponentShield - 3);
                gameState.playerShield += 3;
            }
            break;
        case 'jen':
            if (owner === 'player' && gameState.playerHP <= 9) {
                card.attack *= 2;
            }
            break;
        case 'alpha_kane':
        case 'sebastian':
            dealDamage(owner === 'player' ? 'opponent' : 'player', 3);
            break;
        case 'sylvia':
        case 'sigma_unit':
            discardRandomCard(owner === 'player' ? 'opponent' : 'player');
            break;
        case 'slime_woman':
            if (owner === 'player') {
                gameState.opponentShield = Math.floor(gameState.opponentShield / 2);
            }
            break;
        case 'ayaka':
            if (owner === 'player') {
                gameState.playerShield += 4;
                card.attack += 2;
            }
            break;
        case 'kate':
            if (owner === 'player') {
                gameState.playerField.filter(c => c.cardType === 'character').forEach(c => c.defense += 2);
            }
            break;
        case 'lillie':
            if (owner === 'player' && gameState.playerField.filter(c => c.cardType === 'character').length > 1) {
                const chars = gameState.playerField.filter(c => c.cardType === 'character');
                chars[chars.length - 1].attack *= 2;
            }
            break;
        case 'ninny':
            if (owner === 'player' && gameState.playerField.filter(c => c.cardType === 'character').length > 0) {
                const chars = gameState.playerField.filter(c => c.cardType === 'character');
                const random = chars[Math.floor(Math.random() * chars.length)];
                random.attack += 2;
            }
            break;
        case 'temirtaron':
            ['player', 'opponent'].forEach(side => {
                const field = side === 'player' ? gameState.playerField : gameState.opponentField;
                field.filter(c => c.cardType === 'character').forEach(c => { 
                    c.attack++; 
                    c.defense++; 
                });
            });
            break;
    }
}

// ダメージ処理
function dealDamage(target, amount) {
    const shield = target === 'player' ? gameState.playerShield : gameState.opponentShield;
    const hp = target === 'player' ? 'playerHP' : 'opponentHP';

    if (shield > 0) {
        const shieldDamage = Math.min(shield, amount);
        const remainingDamage = amount - shieldDamage;

        if (target === 'player') {
            gameState.playerShield -= shieldDamage;
            gameState.playerHP -= remainingDamage;
        } else {
            gameState.opponentShield -= shieldDamage;
            gameState.opponentHP -= remainingDamage;
        }

        addLog(`${target === 'player' ? 'あなた' : '相手'}の盾${shieldDamage}を破壊！${remainingDamage}ダメージ！`);
    } else {
        if (target === 'player') {
            gameState.playerHP -= amount;
        } else {
            gameState.opponentHP -= amount;
        }
        addLog(`${target === 'player' ? 'あなた' : '相手'}に${amount}ダメージ！`);
    }

    checkGameOver();
}

// ランダム破棄
function discardRandomCard(who) {
    const hand = who === 'player' ? gameState.playerHand : gameState.opponentHand;
    if (hand.length > 0) {
        const idx = Math.floor(Math.random() * hand.length);
        const discarded = hand.splice(idx, 1)[0];
        addLog(`${who === 'player' ? 'あなたの' : '相手の'}${discarded.name}が破棄された！`);
    }
}

// ターン終了
function endTurn() {
    if (!gameState.isPlayerTurn) return;

    gameState.isPlayerTurn = false;
    gameState.turn = 'opponent';
    gameState.turnCount++;
    document.getElementById('turn-indicator').textContent = '相手のターン';

    // 補充
    drawCard('player');

    // 状態異常処理
    processStatusEffects('player');

    // AIターン
    setTimeout(() => aiTurn(), 1000);
}

// 状態異常処理
function processStatusEffects(owner) {
    const field = owner === 'player' ? gameState.playerField : gameState.opponentField;
    
    field.forEach(card => {
        if (card.statusEffects && card.statusEffects.length > 0) {
            card.statusEffects.forEach(status => {
                if (status.effect.includes('毎ターン:')) {
                    const dmg = parseInt(status.effect.match(/HP-(\d+)/)?.[1] || '0');
                    if (dmg > 0) {
                        if (owner === 'player') gameState.playerHP -= dmg;
                        else gameState.opponentHP -= dmg;
                    }
                }
                status.duration--;
            });
            card.statusEffects = card.statusEffects.filter(s => s.duration > 0);
        }
    });
}

// AIターン
function aiTurn() {
    addLog('相手の手番...');

    // フィールドカードで攻撃
    gameState.opponentField.filter(c => c.cardType === 'character').forEach(card => {
        const playerChars = gameState.playerField.filter(c => c.cardType === 'character');
        if (playerChars.length > 0) {
            const target = playerChars[Math.floor(Math.random() * playerChars.length)];
            const damage = Math.max(0, card.attack - target.defense);
            target.defense -= card.attack;

            if (target.defense <= 0) {
                const idx = gameState.playerField.indexOf(target);
                if (idx > -1) {
                    gameState.playerField.splice(idx, 1);
                    addLog(`${target.name}が破壊された！`);
                }
            }

            dealDamage('player', damage);
        } else {
            dealDamage('player', card.attack);
        }
    });

    if (gameState.isGameOver) return;

    // ブースター/トラップ使用
    const boosters = gameState.opponentHand.filter(c => c.cardType === 'booster');
    const traps = gameState.opponentHand.filter(c => c.cardType === 'trap');

    if (boosters.length > 0) {
        const card = boosters[Math.floor(Math.random() * boosters.length)];
        const idx = gameState.opponentHand.findIndex(c => c.id === card.id);
        gameState.opponentHand.splice(idx, 1);
        activateBooster(card, 'opponent');
        addLog(`相手はブースター発動: ${card.name}！`);
    }

    // キャラクターカード使用
    const chars = gameState.opponentHand.filter(c => c.cardType === 'character');
    if (chars.length > 0 && gameState.opponentField.filter(c => c.cardType === 'character').length < 4) {
        const cardToPlay = chars[Math.floor(Math.random() * chars.length)];
        const idx = gameState.opponentHand.findIndex(c => c.id === cardToPlay.id);
        gameState.opponentHand.splice(idx, 1);
        gameState.opponentField.push(cardToPlay);
        activateAbility(cardToPlay, 'opponent');
        addLog(`相手は${cardToPlay.name}を出した！`);
    }

    // 補充
    drawCard('opponent');

    // 状態異常処理
    processStatusEffects('opponent');

    // ターン終了
    setTimeout(() => {
        gameState.isPlayerTurn = true;
        gameState.turn = 'player';
        document.getElementById('turn-indicator').textContent = 'あなたのターン';
        updateGameUI();
        checkGameOver();
        if (!gameState.isGameOver) {
            addLog('あなたのターンです。');
        }
    }, 500);
}

// 必殺技
function useSpecial() {
    if (!gameState.isPlayerTurn || gameState.isGameOver) return;

    const hasUltimate = gameState.playerField.some(c => 
        c.id === 'iris' || c.id === 'jen' || c.id === 'slime_woman' || c.id === 'layla'
    );

    if (hasUltimate) {
        gameState.opponentField.forEach(card => {
            if (card.cardType === 'character') {
                card.defense -= 5;
                if (card.defense <= 0) {
                    const idx = gameState.opponentField.indexOf(card);
                    if (idx > -1) {
                        gameState.opponentField.splice(idx, 1);
                    }
                }
            }
        });
        dealDamage('opponent', 5);
        addLog('✨ 必殺技発動！');
    } else {
        addLog('必殺技を使用するには特殊カードが必要です！');
    }
}

// ゲームオーバー判定
function checkGameOver() {
    if (gameState.playerHP <= 0) {
        gameState.isGameOver = true;
        document.getElementById('defeat-screen').classList.add('active');
    } else if (gameState.opponentHP <= 0) {
        gameState.isGameOver = true;
        gameState.gold += 500;
        savePlayerData();
        document.getElementById('victory-screen').classList.add('active');
    }
}

// UI更新
function updateGameUI() {
    document.getElementById('player-hp').textContent = `${Math.max(0, gameState.playerHP)}/30`;
    document.getElementById('opponent-hp').textContent = `${Math.max(0, gameState.opponentHP)}/30`;
    document.getElementById('player-health').style.width = `${Math.max(0, (gameState.playerHP / 30) * 100)}%`;
    document.getElementById('opponent-health').style.width = `${Math.max(0, (gameState.opponentHP / 30) * 100)}%`;

    document.getElementById('player-shield').textContent = gameState.playerShield;
    document.getElementById('opponent-shield').textContent = gameState.opponentShield;

    const playerFieldEl = document.getElementById('player-field');
    const opponentFieldEl = document.getElementById('opponent-field');
    const playerHandEl = document.getElementById('player-hand');
    const opponentHandEl = document.getElementById('opponent-hand');

    playerFieldEl.innerHTML = '';
    opponentFieldEl.innerHTML = '';
    playerHandEl.innerHTML = '';
    opponentHandEl.innerHTML = '';

    gameState.playerField.forEach(card => {
        playerFieldEl.appendChild(renderCard(card));
    });

    gameState.opponentField.forEach(card => {
        opponentFieldEl.appendChild(renderCard(card, false, true));
    });

    gameState.playerHand.forEach(card => {
        playerHandEl.appendChild(renderCard(card, true));
    });

    gameState.opponentHand.forEach(() => {
        const cardEl = document.createElement('div');
        cardEl.className = 'game-card hand-card disabled';
        cardEl.innerHTML = `
            <div class="card-header opponent">???</div>
            <div class="card-art"><span class="card-emoji">🂠</span></div>
            <div class="card-stats">
                <span class="card-attack">?</span>
                <span class="card-defense">?</span>
            </div>
        `;
        opponentHandEl.appendChild(cardEl);
    });
}

// ログ追加
function addLog(message) {
    const logEl = document.getElementById('battle-log');
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.textContent = `${gameState.turnCount}T: ${message}`;
    logEl.insertBefore(entry, logEl.firstChild);

    while (logEl.children.length > 10) {
        logEl.removeChild(logEl.lastChild);
    }
}

// ゴールド表示更新
function updateGoldDisplay() {
    document.getElementById('player-gold').textContent = gameState.gold;
}

// テーマ切り替え
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

// カードショーケース描画
function renderCardShowcase() {
    const showcase = document.querySelector('.card-showcase');
    if (!showcase) return;

    const featured = ['mina', 'layla', 'ninny'];
    featured.forEach(id => {
        const card = CARD_DATABASE.find(c => c.id === id);
        if (card) {
            const cardEl = showcase.querySelector(`[data-card="${id}"]`);
            if (cardEl) {
                const imgEl = cardEl.querySelector('.card-image');
                if (imgEl && card.image) {
                    imgEl.src = card.image;
                }
                cardEl.querySelector('.card-name').textContent = card.name;
                cardEl.querySelector('.card-type').textContent = card.faction;
            }
        }
    });
}

// デッキビルダー
function showDeckBuilder() {
    showScreen('deck');
    renderDeckBuilder();
}

function renderDeckBuilder() {
    const poolEl = document.getElementById('available-cards');
    poolEl.innerHTML = '';
    document.getElementById('deck-count').textContent = gameState.playerDeck.length;

    CARD_DATABASE.forEach(card => {
        const cardEl = createCollectionCard(card);
        poolEl.appendChild(cardEl);
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filterCards(e.target.dataset.filter);
        });
    });
}

function filterCards(faction) {
    const poolEl = document.getElementById('available-cards');
    poolEl.innerHTML = '';

    const filtered = faction === 'all'
        ? CARD_DATABASE
        : CARD_DATABASE.filter(c => c.faction === faction);

    filtered.forEach(card => {
        const cardEl = createCollectionCard(card);
        poolEl.appendChild(cardEl);
    });
}

function createCollectionCard(card) {
    const cardEl = document.createElement('div');
    cardEl.className = `game-card hand-card card-type-${card.cardType}`;
    
    const imageHtml = card.image 
        ? `<img src="${card.image}" alt="${card.name}" class="card-image" onerror="this.style.display='none';">`
        : '';

    cardEl.innerHTML = `
        <div class="card-header ${card.cardType}">${card.faction}</div>
        <div class="card-art">${imageHtml}<span class="card-emoji">${card.emoji || '🃏'}</span></div>
        ${card.cardType === 'character' 
            ? `<div class="card-stats"><span class="card-attack">⚔️${card.attack}</span><span class="card-defense">🛡️${card.defense}</span></div>`
            : `<div class="card-effect">${card.ability}</div>`
        }
    `;

    cardEl.addEventListener('click', () => showCardModal(card));
    return cardEl;
}

// カードコレクション
function showCardCollection() {
    showScreen('collection');
    renderCollection();
}

function renderCollection() {
    const grid = document.getElementById('all-cards');
    grid.innerHTML = '';

    document.getElementById('owned-count').textContent = CARD_DATABASE.length;
    document.getElementById('total-count').textContent = CARD_DATABASE.length;

    CARD_DATABASE.forEach(card => {
        const cardEl = createCollectionCard(card);
        grid.appendChild(cardEl);
    });
}

// カードモーダル
function showCardModal(card) {
    const modal = document.getElementById('card-modal');
    const content = document.getElementById('modal-card-content');

    const imageHtml = card.image 
        ? `<img src="${card.image}" alt="${card.name}" class="modal-image" onerror="this.style.display='none';">`
        : '';

    const typeIcon = {
        'character': '👤',
        'booster': '⚡',
        'trap': '🪤',
        'status': '💫'
    }[card.cardType] || '🃏';

    content.innerHTML = `
        <div class="modal-card-large">
            <div class="card-art modal-art">${imageHtml}<span class="modal-emoji">${typeIcon}</span></div>
            <h3>${card.name}</h3>
            <div class="card-faction">${card.cardType.toUpperCase()} | ${card.faction} | ${card.type}</div>
            ${card.cardType === 'character' 
                ? `<div class="modal-stats">
                    <div class="modal-stat"><div class="modal-stat-value">${card.attack}</div><div class="modal-stat-label">攻撃力</div></div>
                    <div class="modal-stat"><div class="modal-stat-value">${card.defense}</div><div class="modal-stat-label">防御力</div></div>
                    <div class="modal-stat"><div class="modal-stat-value">${card.cost}</div><div class="modal-stat-label">コスト</div></div>
                </div>`
                : `<div class="modal-stats">
                    <div class="modal-stat"><div class="modal-stat-value">${card.cost}</div><div class="modal-stat-label">コスト</div></div>
                    ${card.duration ? `<div class="modal-stat"><div class="modal-stat-value">${card.duration}</div><div class="modal-stat-label">持続</div></div>` : ''}
                </div>`
            }
            <div class="modal-description">
                <p><strong>能力:</strong> ${card.ability}</p>
                <p>${card.description}</p>
                <p><em>活動期: ${card.era}</em></p>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function closeCardModal() {
    document.getElementById('card-modal').classList.remove('active');
}

// 世界観
function showLore() {
    showScreen('lore');
}

const LORE_DATA = {
    intro: {
        title: '🌌 E16星系とは',
        content: '<p>E16星系は、M104銀河のハロー領域に位置する二重連星系です。西暦3500年（E1年）の大移民により植民化。</p>'
    },
    auralis: {
        title: '🎵 AURALIS Collective',
        content: '<p>「光と音を永遠にする」芸術 коллектив。E528年の今も活動を続ける。</p>'
    },
    gigapolis: {
        title: '🏙️ ギガポリス',
        content: '<p>ジュラメット川流域の超巨大都市。GDP14京ドル。</p>'
    },
    crescent: {
        title: '🌙 クレセント大地方',
        content: '<p>シンフォニー・オブ・スターズの東大陸。V7加盟国。</p>'
    }
};

function showLoreDetail(key) {
    const lore = LORE_DATA[key];
    if (!lore) return;
    document.getElementById('lore-detail').innerHTML = `<h3>${lore.title}</h3>${lore.content}`;
}

// イベントリスナー
function setupEventListeners() {
    document.getElementById('card-modal').addEventListener('click', (e) => {
        if (e.target.id === 'card-modal') closeCardModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeCardModal();
    });
}

// グローバル関数
window.startGame = startGame;
window.returnToMenu = returnToMenu;
window.showDeckBuilder = showDeckBuilder;
window.showCardCollection = showCardCollection;
window.showLore = showLore;
window.showCardModal = showCardModal;
window.closeCardModal = closeCardModal;
window.showLoreDetail = showLoreDetail;
window.endTurn = endTurn;
window.useSpecial = useSpecial;
window.toggleTheme = toggleTheme;
window.playCard = playCard;
