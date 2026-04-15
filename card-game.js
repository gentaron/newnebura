// E16カードバトラー - ターン制カードゲーム v3.0

// ==================== カードデータベース ====================
const CARD_DATABASE = [
    // AURALIS メンバー
    { id: 'mina', name: 'ミナ・エウレカ・アーネスト', faction: 'AURALIS', cardType: 'character', type: 'strategy', attack: 4, defense: 5, cost: 3, ability: '次元操作: 相手の盾を2減少', image: 'images/Mina Eureka Ernst.png', desc: 'E528年現在のAURALIS第二代総合プロデューサー' },
    { id: 'layla', name: 'レイラ・ヴィレル・ノヴァ', faction: 'AURALIS', cardType: 'character', type: 'warrior', attack: 8, defense: 4, cost: 5, ability: 'Pink Voltage: 攻撃力+3', image: 'images/Layla Virel Nova.png', desc: '凍眠保存から復活した最強戦士' },
    { id: 'kate', name: 'ケイト・パットン', faction: 'AURALIS', cardType: 'character', type: 'support', attack: 2, defense: 7, cost: 2, ability: '大地の安定: 味方に盾+2', image: 'images/Kate Patton.png', desc: '「大地の豊かさ」を体現する第二代' },
    { id: 'lillie', name: 'リリー・アーデント', faction: 'AURALIS', cardType: 'character', type: 'art', attack: 3, defense: 4, cost: 2, ability: '情熱増幅: 味方の攻撃+2', image: 'images/Lillie Ardent.png', desc: '「情熱的で大胆」な第二代芸術家' },
    { id: 'ninny', name: 'ニニー・オフェンバック', faction: 'AURALIS', cardType: 'character', type: 'speed', attack: 5, defense: 2, cost: 2, ability: '爆発活力: ランダム味方に+2', image: 'images/Ninny Offenbach.png', desc: '無邪気で爆発的な活力' },

    // Gigapolis
    { id: 'jen', name: 'Jen', faction: 'Gigapolis', cardType: 'character', type: 'elite', attack: 9, defense: 8, cost: 6, ability: 'Valoriaの守護者: HP低下時攻撃力2倍', emoji: '🏰', desc: 'Lv.938+の最強戦士' },
    { id: 'alpha_kane', name: 'アルファ・ケイン', faction: 'Gigapagos', cardType: 'character', type: 'warrior', attack: 7, defense: 5, cost: 4, ability: '戦士決定戦覇者: 召喚時3ダメージ', emoji: '⚔️', desc: 'ネオクラン同盟の創始者' },
    { id: 'selia', name: 'セリア・ドミニクス', faction: 'Gigapolis', cardType: 'character', type: 'ruler', attack: 6, defense: 6, cost: 5, ability: '黄金時代: 盾+4、攻撃+2', emoji: '👑', desc: 'Selinopolis創設者' },
    { id: '弦太郎', name: '弦太郎', faction: 'Gigapolis', cardType: 'character', type: 'hero', attack: 6, defense: 5, cost: 4, ability: 'Valoria流派: 味方に盾+2', emoji: '🌸', desc: 'Lv.569のフェミニン・ヒーロー' },

    // トリニティ / V7
    { id: 'iris', name: 'アイリス', faction: 'トリニティ', cardType: 'character', type: 'ruler', attack: 8, defense: 7, cost: 6, ability: 'Vaermillion支配者: 毎ターン+1/+1', emoji: '🌸', desc: 'IRISランキング1位' },
    { id: 'fiona', name: 'フィオナ', faction: 'V7', cardType: 'character', type: 'warrior', attack: 7, defense: 4, cost: 4, ability: 'スパッツ外交: 盾無視で攻撃', emoji: '🌹', desc: 'ブルー・ローズ統率者' },
    { id: 'marina', name: 'マリーナ・ボビン', faction: 'V7', cardType: 'character', type: 'support', attack: 3, defense: 8, cost: 3, ability: 'ミエルテンガ総統: 味方に盾+3', emoji: '🎖️', desc: 'IRISランキング3位' },
    { id: 'sebastian', name: 'セバスチャン', faction: 'V7', cardType: 'character', type: 'elite', attack: 8, defense: 5, cost: 5, ability: 'ボグダスジャベリン: 召喚時3ダメージ', emoji: '🗡️', desc: 'テクロサスの正統後継者' },
    { id: 'kastina', name: 'カスチーナ', faction: 'V7', cardType: 'character', type: 'mage', attack: 5, defense: 6, cost: 4, ability: '嵐の召喚: 相手全体2ダメージ', emoji: '⚡', desc: 'クロセヴィア首脳' },

    // Alpha Venom
    { id: 'alpha_venom', name: 'アルファ・ヴェノム', faction: 'Alpha Venom', cardType: 'character', type: 'villain', attack: 9, defense: 6, cost: 6, ability: '闇の支配: 相手全体3ダメージ', emoji: '🦠', desc: '両陣営共通の敵' },
    { id: 'sigma_unit', name: 'Σ-ユニット', faction: 'Alpha Venom', cardType: 'character', type: 'soldier', attack: 5, defense: 4, cost: 3, ability: '精神操作: 相手手札1枚破棄', emoji: '💀', desc: '極秘部隊' },

    // 歴史的英雄
    { id: 'timur', name: 'ティムール・シャー', faction: '歴史', cardType: 'character', type: 'founder', attack: 5, defense: 6, cost: 4, ability: '10次元ホラズム: 盾+5', emoji: '🌌', desc: '移民団リーダー' },
    { id: 'temirtaron', name: 'テミルタロン', faction: '歴史', cardType: 'character', type: 'sage', attack: 4, defense: 5, cost: 4, ability: 'サイケコスモ: 全員+1/+1', emoji: '🔮', desc: '次元理論の完成者' },
    { id: 'el_forhouse', name: 'エル・フォルハウス', faction: '歴史', cardType: 'character', type: 'reformer', attack: 4, defense: 4, cost: 3, ability: 'マーストリヒト革命: 盾-3/+3', emoji: '📜', desc: '革命指導者' },
    { id: 'sylvia', name: 'シルヴィア・クロウ', faction: 'Eros-7', cardType: 'character', type: 'esper', attack: 6, defense: 5, cost: 4, ability: 'エスパー能力: 相手手札破棄', emoji: '👁️', desc: 'スライム危機解決者' },
    { id: 'ayaka', name: 'アヤカ・リン', faction: 'Eros-7', cardType: 'character', type: 'hero', attack: 7, defense: 4, cost: 4, ability: 'ビキニバリア: 盾+4、攻撃+2', emoji: '🛡️', desc: 'Lv.842のハンター' },
    { id: 'lilith', name: 'リリス・ヴェイン', faction: 'Eros-7', cardType: 'character', type: 'founder', attack: 3, defense: 6, cost: 3, ability: '搾取の支配者: 盾+3、攻撃+1', emoji: '🕷️', desc: 'Eros-7初期リーダー' },
    { id: 'slime_woman', name: 'スライム・ウィメン', faction: '特殊', cardType: 'character', type: 'dimensional', attack: 8, defense: 3, cost: 5, ability: '次元干渉: 盾半減', emoji: '🟣', desc: '高次元から顕現' },

    // ブースターカード
    { id: 'booster1', name: '次元極地平', faction: '技術', cardType: 'booster', type: 'tech', cost: 2, ability: '味方全員: 攻撃+3', emoji: '🌌', desc: '高次元空間アクセス技術' },
    { id: 'booster2', name: 'ペルセポネ', faction: '技術', cardType: 'booster', type: 'virtual', cost: 3, ability: '味方全員: 盾+4', emoji: '🔮', desc: '仮想多元宇宙システム' },
    { id: 'booster3', name: 'nトークン経済', faction: '技術', cardType: 'booster', type: 'economy', cost: 2, ability: 'HP+5、盾+2', emoji: '💰', desc: '量子暗号化通貨' },
    { id: 'booster4', name: 'リミナル・フォージ', faction: 'AURALIS', cardType: 'booster', type: 'special', cost: 4, ability: '味方全員: 攻撃+3、盾+2', emoji: '✨', desc: '時相放送プロジェクト' },
    { id: 'booster5', name: '戦士決定戦', faction: 'Gigapolis', cardType: 'booster', type: 'event', cost: 3, ability: '味方1体: 攻撃+5', emoji: '⚔️', desc: 'ネオンコロシアム決戦' },
    { id: 'booster6', name: 'スライム危機', faction: '歴史', cardType: 'booster', type: 'event', cost: 3, ability: '相手全体: 3ダメージ', emoji: '🟢', desc: 'E380-400年の災害' },

    // トラップカード
    { id: 'trap1', name: '次元崩壊', faction: '特殊', cardType: 'trap', type: 'counter', cost: 3, ability: '相手全体: ATK-3、DEF-3', emoji: '💥', desc: '高次元崩壊' },
    { id: 'trap2', name: '精神操作', faction: 'Alpha Venom', cardType: 'trap', type: 'control', cost: 3, ability: '相手手札2枚破棄', emoji: '🧠', desc: 'Σ-ユニット技術' },
    { id: 'trap3', name: 'エネルギー枯渇', faction: 'Eros-7', cardType: 'trap', type: 'drain', cost: 2, ability: '盾-3、HP+3', emoji: '🔋', desc: 'エネルギー抽出' },
    { id: 'trap4', name: 'ネオンコロシアム', faction: 'Gigapolis', cardType: 'trap', type: 'arena', cost: 3, ability: '盾+5、敵攻撃-2', emoji: '🏟️', desc: '防御の舞台' },

    // 状態異常カード
    { id: 'status1', name: 'スライム傷', faction: '特殊', cardType: 'status', type: 'poison', cost: 1, ability: '毎ターン: ATK-2、DEF-1', emoji: '☠️', desc: 'スライムの酸' },
    { id: 'status2', name: 'Shield Field', faction: 'Gigapolis', cardType: 'status', type: 'shield', cost: 2, ability: '盾+5', emoji: '🛡️', desc: 'ナノ防御場' },
    { id: 'status3', name: '曲率加速', faction: '技術', cardType: 'status', type: 'speed', cost: 2, ability: '攻撃+3、再攻撃', emoji: '🚀', desc: '速度向上' },
    { id: 'status4', name: 'ヒーロー覚悟', faction: 'Gigapolis', cardType: 'status', type: 'morale', cost: 2, ability: 'HP20%以下: ATK+5', emoji: '🔥', desc: '危機の覚醒' }
];

// ==================== ゲーム状態 ====================
let gameState = {
    phase: 'menu', // menu, playing, gameover
    turn: 'player',
    turnCount: 1,
    
    // HPと盾
    playerHP: 30,
    playerShield: 0,
    enemyHP: 30,
    enemyShield: 0,
    
    // フィールド
    playerField: [],
    enemyField: [],
    
    // 手札
    playerHand: [],
    enemyHand: [],
    
    // 選択状態
    selectedCard: null,
    selectedAttacker: null,
    mode: 'normal' // normal, attack, booster, trap
};

// ==================== 画面切り替え ====================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function backToMenu() {
    gameState.phase = 'menu';
    showScreen('menu-screen');
}

function startGame() {
    initGame();
    showScreen('game-screen');
    updateUI();
    addLog('=== ゲーム開始！ ===');
    addLog('あなたのターンです');
}

function initGame() {
    gameState = {
        phase: 'playing',
        turn: 'player',
        turnCount: 1,
        playerHP: 30,
        playerShield: 0,
        enemyHP: 30,
        enemyShield: 0,
        playerField: [],
        enemyField: [],
        playerHand: [],
        enemyHand: [],
        selectedCard: null,
        selectedAttacker: null,
        mode: 'normal'
    };
    
    // デッキ作成（25枚）
    const deck = createDeck();
    
    // 初期手札
    for (let i = 0; i < 5; i++) {
        gameState.playerHand.push(deck.pop());
        gameState.enemyHand.push({...deck.pop(), faceDown: true});
    }
}

// デッキ作成
function createDeck() {
    const chars = CARD_DATABASE.filter(c => c.cardType === 'character');
    const boosters = CARD_DATABASE.filter(c => c.cardType === 'booster');
    const traps = CARD_DATABASE.filter(c => c.cardType === 'trap');
    const statuses = CARD_DATABASE.filter(c => c.cardType === 'status');
    
    const deck = [
        ...shuffle([...chars]),
        ...shuffle([...boosters]),
        ...shuffle([...traps]),
        ...shuffle([...statuses])
    ];
    
    return deck.slice(0, 25);
}

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ==================== UI更新 ====================
function updateUI() {
    // HP
    document.getElementById('player-hp').textContent = `${gameState.playerHP}/30`;
    document.getElementById('player-hp-bar').style.width = `${(gameState.playerHP / 30) * 100}%`;
    document.getElementById('enemy-hp').textContent = `${gameState.enemyHP}/30`;
    document.getElementById('enemy-hp-bar').style.width = `${(gameState.enemyHP / 30) * 100}%`;
    
    // 盾
    document.getElementById('player-shield').textContent = gameState.playerShield;
    document.getElementById('enemy-shield').textContent = gameState.enemyShield;
    
    // ターン表示
    document.getElementById('turn-indicator').textContent = 
        gameState.turn === 'player' ? 'あなたのターン' : '相手のターン';
    
    // フェーズ表示
    updatePhaseIndicator();
    
    // 攻撃ボタン
    const attackBtn = document.getElementById('attack-btn');
    attackBtn.disabled = gameState.turn !== 'player' || gameState.selectedAttacker === null;
    
    // フィールド描画
    renderField();
    renderHand();
}

function updatePhaseIndicator() {
    const phase = document.getElementById('phase-indicator');
    
    if (gameState.mode === 'attack') {
        phase.textContent = '攻撃する相手を選んでください';
    } else if (gameState.selectedCard) {
        if (gameState.selectedCard.cardType === 'character') {
            phase.textContent = '「場に置く」か「攻撃する」を選択';
        } else {
            phase.textContent = '効果を発動しますか？';
        }
    } else {
        phase.textContent = 'カードを選んで場に置いてください';
    }
}

function renderField() {
    const playerFieldEl = document.getElementById('player-field');
    const enemyFieldEl = document.getElementById('enemy-field');
    
    playerFieldEl.innerHTML = '<div class="field-label">あなたのフィールド</div>';
    enemyFieldEl.innerHTML = '<div class="field-label">相手フィールド</div>';
    
    // プレイヤーフィールド
    gameState.playerField.forEach((card, idx) => {
        const cardEl = createCardElement(card, 'field');
        cardEl.classList.add(gameState.selectedAttacker === idx ? 'attack-mode' : '');
        cardEl.onclick = () => selectFieldCard(idx);
        playerFieldEl.appendChild(cardEl);
    });
    
    // 相手フィールド
    gameState.enemyField.forEach((card, idx) => {
        const cardEl = createCardElement(card, 'field');
        cardEl.classList.add(gameState.mode === 'attack' ? 'target-mode' : '');
        if (gameState.mode === 'attack') {
            cardEl.onclick = () => attackCard(idx);
        }
        enemyFieldEl.appendChild(cardEl);
    });
}

function renderHand() {
    const playerHandEl = document.getElementById('player-hand');
    const enemyHandEl = document.getElementById('enemy-hand');
    
    playerHandEl.innerHTML = '';
    enemyHandEl.innerHTML = '';
    
    // プレイヤーの手札
    gameState.playerHand.forEach((card, idx) => {
        const cardEl = createCardElement(card, 'hand');
        cardEl.classList.add(gameState.selectedCard === idx ? 'selected' : '');
        cardEl.onclick = () => selectHandCard(idx);
        playerHandEl.appendChild(cardEl);
    });
    
    // 相手の手札（伏せ）
    gameState.enemyHand.forEach(() => {
        const hidden = document.createElement('div');
        hidden.className = 'hidden-card';
        hidden.textContent = '🂠';
        enemyHandEl.appendChild(hidden);
    });
}

function createCardElement(card, mode) {
    const el = document.createElement('div');
    el.className = `game-card ${mode === 'field' ? 'field-card' : ''}`;
    
    // ヘッダー
    const header = document.createElement('div');
    header.className = `card-header ${card.cardType}`;
    header.textContent = card.faction;
    el.appendChild(header);
    
    // 画像または絵文字
    const imgArea = document.createElement('div');
    imgArea.className = 'card-image';
    
    if (card.image && mode === 'hand') {
        const img = document.createElement('img');
        img.src = card.image;
        img.alt = card.name;
        img.className = 'card-image';
        img.onerror = () => {
            imgArea.innerHTML = `<span class="card-emoji">${card.emoji || '🃏'}</span>`;
        };
        imgArea.appendChild(img);
    } else {
        imgArea.innerHTML = `<span class="card-emoji">${card.emoji || '🃏'}</span>`;
    }
    el.appendChild(imgArea);
    
    // カード情報
    const info = document.createElement('div');
    info.className = 'card-info';
    
    const name = document.createElement('div');
    name.className = 'card-name';
    name.textContent = card.name;
    info.appendChild(name);
    
    if (card.cardType === 'character') {
        const stats = document.createElement('div');
        stats.className = 'card-stats';
        stats.innerHTML = `<span class="atk">⚔️${card.attack}</span><span class="def">🛡️${card.defense}</span>`;
        info.appendChild(stats);
    } else {
        const cost = document.createElement('div');
        cost.className = 'card-stats';
        cost.innerHTML = `<span class="atk">💫${card.cost}</span>`;
        info.appendChild(cost);
    }
    
    el.appendChild(info);
    
    return el;
}

// ==================== カード選択 ====================
function selectHandCard(idx) {
    if (gameState.turn !== 'player') return;
    
    const card = gameState.playerHand[idx];
    
    if (gameState.mode === 'attack') {
        // 攻撃モード中はキャンセル
        cancelAction();
        return;
    }
    
    if (gameState.selectedCard === idx) {
        // 同じカードを選択 → 場に出す
        playCard(idx);
    } else {
        gameState.selectedCard = idx;
        gameState.selectedAttacker = null;
        updateUI();
    }
}

function selectFieldCard(idx) {
    if (gameState.turn !== 'player') return;
    
    const card = gameState.playerField[idx];
    
    if (gameState.mode === 'attack') {
        // 攻撃モード中のキャンセル
        cancelAction();
        return;
    }
    
    // フィールドのカードを選択 → 攻撃モード
    if (gameState.selectedAttacker === idx) {
        gameState.selectedAttacker = null;
    } else {
        gameState.selectedAttacker = idx;
        gameState.selectedCard = null;
    }
    
    updateUI();
}

function playCard(idx) {
    if (gameState.turn !== 'player') return;
    if (gameState.playerField.length >= 5) {
        addLog('フィールドが一杯です！');
        return;
    }
    
    const card = gameState.playerHand[idx];
    
    // キャラクターカードのみ場に出せる
    if (card.cardType === 'character') {
        gameState.playerHand.splice(idx, 1);
        gameState.playerField.push(card);
        addLog(`${card.name}を場に出した！ (ATK:${card.attack} DEF:${card.defense})`);
        
        // 能力発動
        activateAbility(card, 'player');
    } else {
        // ブースター/トラップ/状態異常は即発動
        activateCard(card, 'player');
    }
    
    gameState.selectedCard = null;
    updateUI();
    checkGameOver();
}

function cancelAction() {
    gameState.mode = 'normal';
    gameState.selectedCard = null;
    gameState.selectedAttacker = null;
    updateUI();
}

// ==================== 攻撃 ====================
function executeAttack() {
    if (gameState.selectedAttacker === null) return;
    
    const attacker = gameState.playerField[gameState.selectedAttacker];
    
    if (gameState.enemyField.length === 0) {
        // 相手フィールドが空 → 直接攻撃
        dealDamageToEnemy(attacker.attack);
        addLog(`${attacker.name}が直接攻撃！ ${attacker.attack}ダメージ！`);
    } else {
        // 相手フィールドにカードがある → 攻撃モード
        gameState.mode = 'attack';
        addLog(`${attacker.name}で攻撃する相手を選択！`);
    }
    
    updateUI();
}

function attackCard(idx) {
    if (gameState.selectedAttacker === null) return;
    
    const attacker = gameState.playerField[gameState.selectedAttacker];
    const defender = gameState.enemyField[idx];
    
    // ダメージ計算
    const damage = Math.max(0, attacker.attack - defender.defense);
    defender.defense -= attacker.attack;
    
    addLog(`${attacker.name}が${defender.name}を攻撃！`);
    
    if (defender.defense <= 0) {
        // 破壊
        gameState.enemyField.splice(idx, 1);
        addLog(`${defender.name}を破壊した！`, 'damage');
    } else {
        addLog(`${defender.name}の防御力が${defender.defense}になった`);
    }
    
    // 攻撃したカードは裏返す or 除去
    gameState.playerField.splice(gameState.selectedAttacker, 1);
    
    gameState.mode = 'normal';
    gameState.selectedAttacker = null;
    
    updateUI();
    checkGameOver();
}

function dealDamageToEnemy(amount) {
    let damage = amount;
    
    // 盾で軽減
    if (gameState.enemyShield > 0) {
        const shieldDamage = Math.min(gameState.enemyShield, damage);
        gameState.enemyShield -= shieldDamage;
        damage -= shieldDamage;
        if (shieldDamage > 0) {
            addLog(`相手の盾${shieldDamage}を破壊！`);
        }
    }
    
    if (damage > 0) {
        gameState.enemyHP -= damage;
        addLog(`相手に${damage}ダメージ！`, 'damage');
    }
}

// ==================== カード効果 ====================
function activateAbility(card, owner) {
    const ability = card.ability;
    
    if (ability.includes('召喚時3ダメージ')) {
        if (owner === 'player') {
            dealDamageToEnemy(3);
        } else {
            dealDamageToPlayer(3);
        }
    }
    
    if (ability.includes('盾+4') || ability.includes('盾+5')) {
        const shield = parseInt(ability.match(/盾\+(\d+)/)?.[1] || '0');
        if (owner === 'player') {
            gameState.playerShield += shield;
        } else {
            gameState.enemyShield += shield;
        }
    }
}

function activateCard(card, owner) {
    const ability = card.ability;
    
    if (card.cardType === 'booster') {
        // ブースター効果
        if (ability.includes('HP+')) {
            const heal = parseInt(ability.match(/HP\+(\d+)/)?.[1] || '0');
            if (owner === 'player') {
                gameState.playerHP = Math.min(30, gameState.playerHP + heal);
            } else {
                gameState.enemyHP = Math.min(30, gameState.enemyHP + heal);
            }
            addLog(`${owner === 'player' ? 'あなたの' : '相手の'}HPが${heal}回復！`, 'heal');
        }
        
        if (ability.includes('盾+')) {
            const shield = parseInt(ability.match(/盾\+(\d+)/)?.[1] || '0');
            if (owner === 'player') {
                gameState.playerShield += shield;
            } else {
                gameState.enemyShield += shield;
            }
            addLog(`盾+${shield}`, 'heal');
        }
        
        if (ability.includes('攻撃+')) {
            const atk = parseInt(ability.match(/攻撃\+(\d+)/)?.[1] || '0');
            const field = owner === 'player' ? gameState.playerField : gameState.enemyField;
            field.forEach(c => {
                if (c.cardType === 'character') c.attack += atk;
            });
            addLog(`味方の攻撃+${atk}`, 'action');
        }
        
        if (ability.includes('相手全体') && ability.includes('ダメージ')) {
            const dmg = parseInt(ability.match(/(\d+)ダメージ/)?.[1] || '0');
            if (owner === 'player') {
                gameState.enemyField.forEach(c => c.defense -= dmg);
                dealDamageToEnemy(dmg);
            } else {
                gameState.playerField.forEach(c => c.defense -= dmg);
                dealDamageToPlayer(dmg);
            }
        }
    }
    
    if (card.cardType === 'trap') {
        // トラップ効果
        if (ability.includes('盾-')) {
            const shield = parseInt(ability.match(/盾-(\d+)/)?.[1] || '0');
            if (owner === 'player') {
                gameState.enemyShield = Math.max(0, gameState.enemyShield - shield);
            } else {
                gameState.playerShield = Math.max(0, gameState.playerShield - shield);
            }
        }
        
        if (ability.includes('盾+')) {
            const shield = parseInt(ability.match(/盾\+(\d+)/)?.[1] || '0');
            if (owner === 'player') {
                gameState.playerShield += shield;
            } else {
                gameState.enemyShield += shield;
            }
        }
        
        if (ability.includes('相手手札')) {
            const count = parseInt(ability.match(/(\d+)枚/)?.[1] || '1');
            const hand = owner === 'player' ? gameState.enemyHand : gameState.playerHand;
            for (let i = 0; i < count && hand.length > 0; i++) {
                const idx = Math.floor(Math.random() * hand.length);
                const removed = hand.splice(idx, 1)[0];
                addLog(`${owner === 'player' ? '相手' : 'あなた'}の${removed.name}が破棄された！`, 'damage');
            }
        }
        
        if (ability.includes('敵攻撃-')) {
            const atk = parseInt(ability.match(/攻撃-(\d+)/)?.[1] || '0');
            const field = owner === 'player' ? gameState.enemyField : gameState.playerField;
            field.forEach(c => {
                if (c.cardType === 'character') c.attack = Math.max(0, c.attack - atk);
            });
        }
    }
    
    // 手札から消費
    if (owner === 'player') {
        const idx = gameState.playerHand.findIndex(c => c.id === card.id);
        if (idx > -1) gameState.playerHand.splice(idx, 1);
    }
    
    addLog(`${card.name}の効果を発動！`, 'action');
    updateUI();
    checkGameOver();
}

function dealDamageToPlayer(amount) {
    let damage = amount;
    
    if (gameState.playerShield > 0) {
        const shieldDamage = Math.min(gameState.playerShield, damage);
        gameState.playerShield -= shieldDamage;
        damage -= shieldDamage;
    }
    
    if (damage > 0) {
        gameState.playerHP -= damage;
        addLog(`あなたが${damage}ダメージを受けた！`, 'damage');
    }
}

// ==================== ターン終了 ====================
function endTurn() {
    if (gameState.turn !== 'player') return;
    
    gameState.turn = 'enemy';
    gameState.mode = 'normal';
    gameState.selectedCard = null;
    gameState.selectedAttacker = null;
    
    // 補充
    if (gameState.enemyHand.length < 7) {
        const deck = createDeck();
        gameState.enemyHand.push({...deck.pop(), faceDown: true});
    }
    
    addLog('=== 相手のターン ===');
    updateUI();
    
    // AIターン
    setTimeout(enemyTurn, 1000);
}

function enemyTurn() {
    addLog('相手の手番...');
    
    // フィールドカードで攻撃
    if (gameState.playerField.length === 0) {
        // 直接攻撃
        const totalAtk = gameState.enemyField.reduce((sum, c) => sum + c.attack, 0);
        if (totalAtk > 0) {
            dealDamageToPlayer(totalAtk);
            addLog(`相手から${totalAtk}ダメージ！`, 'damage');
        }
    } else {
        // フィールドのカードで攻撃
        gameState.enemyField.forEach((card, idx) => {
            const target = gameState.playerField[0];
            if (target) {
                target.defense -= card.attack;
                addLog(`${card.name}が${target.name}を攻撃！`);
                
                if (target.defense <= 0) {
                    gameState.playerField.shift();
                    addLog(`${target.name}が破壊された！`, 'damage');
                }
            }
        });
    }
    
    if (checkGameOver()) return;
    
    // カードを出す
    const chars = gameState.enemyHand.filter(c => c.cardType === 'character');
    if (chars.length > 0 && gameState.enemyField.length < 5) {
        const card = chars[0];
        const idx = gameState.enemyHand.findIndex(c => c.id === card.id);
        gameState.enemyHand.splice(idx, 1);
        gameState.enemyField.push(card);
        addLog(`相手が${card.name}を出した！`);
    }
    
    // 補充
    if (gameState.playerHand.length < 7) {
        const deck = createDeck();
        gameState.playerHand.push(deck.pop());
    }
    
    // ターン終了
    setTimeout(() => {
        gameState.turn = 'player';
        gameState.turnCount++;
        addLog(`=== あなたのターン (${gameState.turnCount}) ===`);
        updateUI();
    }, 1000);
}

// ==================== 勝敗判定 ====================
function checkGameOver() {
    if (gameState.enemyHP <= 0) {
        gameState.phase = 'gameover';
        document.getElementById('victory-modal').classList.add('active');
        addLog('🏆 勝利！', 'heal');
        return true;
    }
    
    if (gameState.playerHP <= 0) {
        gameState.phase = 'gameover';
        document.getElementById('defeat-modal').classList.add('active');
        addLog('💀 敗北...', 'damage');
        return true;
    }
    
    return false;
}

// ==================== ログ ====================
function addLog(message, type = '') {
    const log = document.getElementById('battle-log');
    const entry = document.createElement('div');
    entry.className = `log-entry ${type ? 'log-' + type : ''}`;
    entry.textContent = message;
    log.insertBefore(entry, log.firstChild);
    
    while (log.children.length > 15) {
        log.removeChild(log.lastChild);
    }
}

// ==================== カード一覧 ====================
function showCollection() {
    showScreen('collection-screen');
    document.getElementById('card-count').textContent = CARD_DATABASE.length;
    renderCollection('all');
}

function filterCards(type) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    renderCollection(type);
}

function renderCollection(filter) {
    const grid = document.getElementById('card-grid');
    grid.innerHTML = '';
    
    const filtered = filter === 'all' 
        ? CARD_DATABASE 
        : CARD_DATABASE.filter(c => c.cardType === filter);
    
    filtered.forEach(card => {
        const el = document.createElement('div');
        el.className = 'game-card collection-card';
        el.innerHTML = `
            <div class="card-header ${card.cardType}">${card.faction}</div>
            ${card.image ? `<img src="${card.image}" alt="${card.name}" class="card-image" onerror="this.style.display='none'">` : ''}
            <div class="card-emoji">${card.emoji || '🃏'}</div>
            <div class="card-info">
                <div class="card-name">${card.name}</div>
                ${card.cardType === 'character' 
                    ? `<div class="card-stats"><span class="atk">⚔️${card.attack}</span><span class="def">🛡️${card.defense}</span></div>`
                    : `<div class="card-stats"><span>💫${card.cost}</span></div>`
                }
            </div>
        `;
        el.onclick = () => showCardDetail(card);
        grid.appendChild(el);
    });
}

function showCardDetail(card) {
    const modal = document.getElementById('card-modal');
    const content = document.getElementById('modal-content');
    
    content.innerHTML = `
        ${card.image ? `<img src="${card.image}" alt="${card.name}" class="detail-image">` : ''}
        <div class="detail-header">${card.cardType.toUpperCase()} | ${card.faction}</div>
        <div class="detail-name">${card.name}</div>
        ${card.cardType === 'character' 
            ? `<div class="detail-stats">
                <div class="detail-stat">
                    <div class="detail-stat-value" style="color: var(--danger)">${card.attack}</div>
                    <div class="detail-stat-label">攻撃力</div>
                </div>
                <div class="detail-stat">
                    <div class="detail-stat-value" style="color: var(--secondary)">${card.defense}</div>
                    <div class="detail-stat-label">防御力</div>
                </div>
                <div class="detail-stat">
                    <div class="detail-stat-value">${card.cost}</div>
                    <div class="detail-stat-label">コスト</div>
                </div>
            </div>`
            : `<div class="detail-stats">
                <div class="detail-stat">
                    <div class="detail-stat-value">${card.cost}</div>
                    <div class="detail-stat-label">コスト</div>
                </div>
            </div>`
        }
        <div class="detail-ability">
            <strong>能力:</strong> ${card.ability}
        </div>
        <div class="detail-desc">${card.desc || ''}</div>
    `;
    
    modal.classList.add('active');
}

function showCardInfo(id) {
    const card = CARD_DATABASE.find(c => c.id === id);
    if (card) showCardDetail(card);
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
}

function showDeckBuilder() {
    showScreen('deck-screen');
}

// ==================== 初期化 ====================
document.addEventListener('DOMContentLoaded', () => {
    // モーダル外クリックで閉じる
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    });
    
    // キーボード
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cancelAction();
            closeModal();
        }
    });
});

// グローバル暴露
window.startGame = startGame;
window.backToMenu = backToMenu;
window.selectHandCard = selectHandCard;
window.selectFieldCard = selectFieldCard;
window.executeAttack = executeAttack;
window.attackCard = attackCard;
window.endTurn = endTurn;
window.cancelAction = cancelAction;
window.showCollection = showCollection;
window.filterCards = filterCards;
window.showCardDetail = showCardDetail;
window.showCardInfo = showCardInfo;
window.closeModal = closeModal;
window.showDeckBuilder = showDeckBuilder;
