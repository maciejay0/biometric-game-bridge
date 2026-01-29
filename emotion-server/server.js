// server.js (Raw WebSocket 版本)
const WebSocket = require('ws');

// 在 3000 端口启动标准 WebSocket 服务
const wss = new WebSocket.Server({ port: 3000 });

console.log(">>> [通用] 游戏信号中继站启动 (Port: 3000)");

wss.on('connection', function connection(ws) {
    console.log('[系统] 新客户端接入...');

    // 监听客户端发来的消息
    ws.on('message', function incoming(message) {
        // message 是二进制数据，我们需要转成字符串再转 JSON
        const msgString = message.toString();

        // 简单打印一下收到的数据（调试用）
        // console.log('收到:', msgString.substring(0, 50) + "...");

        // --- 核心逻辑：广播 (Broadcast) ---
        // 把收到的这份数据，转发给所有【其他】连接着的客户端
        //  Web -> Godot 的桥梁
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(msgString);
            }
        });
    });

    ws.on('close', () => console.log('[系统] 客户端断开'));
});