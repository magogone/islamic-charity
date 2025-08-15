# 回馈券系统设计

## 系统概述

为了庆祝先知穆罕默德诞辰而设计的递进式回馈券系统，通过购买不同等级获得相应的代金券奖励。

## 等级与回馈券结构

### 🎯 活动入门 ($20)

- **购买费用**: $20 USD
- **获得回馈券**: V1 等级回馈券 $20
- **可用于**: 购买 V1 等级时抵扣

### 💎 VIP 等级递进系统

#### V1 等级 ($100)

- **正常价格**: $100
- **使用回馈券**: 可使用活动回馈券$20
- **实际支付**: $80
- **总价值**: $120 (原价$100 + 回馈券$20)
- **获得奖励**: V2 等级回馈券 $66

#### V2 等级 ($300)

- **正常价格**: $300
- **使用回馈券**: 可使用 V1 回馈券$66
- **实际支付**: $234
- **总价值**: $366 (原价$300 + 回馈券$66)
- **获得奖励**: V3 等级回馈券 $122

#### V3 等级 ($500)

- **正常价格**: $500
- **使用回馈券**: 可使用 V2 回馈券$122
- **实际支付**: $378
- **总价值**: $622 (原价$500 + 回馈券$122)
- **获得奖励**: V4 等级回馈券 $200

#### V4 等级 ($1000)

- **正常价格**: $1000
- **使用回馈券**: 可使用 V3 回馈券$200
- **实际支付**: $800
- **总价值**: $1200 (原价$1000 + 回馈券$200)
- **获得奖励**: V5 等级回馈券 $360

#### V5 等级 ($2000)

- **正常价格**: $2000
- **使用回馈券**: 可使用 V4 回馈券$360
- **实际支付**: $1640
- **总价值**: $2360 (原价$2000 + 回馈券$360)
- **获得奖励**: 顶级会员专属权益

## 回馈券特性

### 📋 回馈券属性

- **名称**: 等级回馈券 (如：V1 等级回馈券)
- **有效期**: 购买后 90 天内有效
- **使用限制**: 只能用于对应的下一等级购买
- **转让性**: 不可转让，绑定账户
- **累积性**: 不可与其他回馈券叠加使用

### 🛡️ 防刷机制

- **身份验证**: 实名认证后才能参与
- **限购机制**: 每个账户只能参与一次活动
- **KYC 要求**: 需要完成身份验证
- **设备限制**: 同一设备最多绑定 3 个账户

## 数据库设计

### 回馈券表 (vouchers)

```sql
CREATE TABLE vouchers (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  voucher_type ENUM('V1', 'V2', 'V3', 'V4', 'V5') NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status ENUM('active', 'used', 'expired') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  used_at TIMESTAMP NULL,
  used_for_order_id BIGINT NULL
);
```

### 活动参与记录表 (prophet_birthday_participants)

```sql
CREATE TABLE prophet_birthday_participants (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL UNIQUE,
  payment_amount DECIMAL(10,2) NOT NULL DEFAULT 20.00,
  voucher_id BIGINT NULL,
  participated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('pending', 'completed', 'failed') DEFAULT 'pending'
);
```

## API 接口设计

### 1. 参与活动

```
POST /api/prophet-birthday/participate
Body: {
  payment_method: "string",
  amount: 20
}
Response: {
  success: boolean,
  voucher_id: number,
  message: string
}
```

### 2. 查询回馈券

```
GET /api/vouchers/my-vouchers
Response: {
  vouchers: [
    {
      id: number,
      type: string,
      amount: number,
      status: string,
      expires_at: string
    }
  ]
}
```

### 3. 使用回馈券

```
POST /api/vouchers/use
Body: {
  voucher_id: number,
  target_level: string
}
Response: {
  success: boolean,
  discount_amount: number,
  final_price: number
}
```

## 前端组件

### 回馈券显示组件

- 显示用户拥有的回馈券
- 显示有效期和状态
- 提供使用按钮

### VIP 升级页面

- 集成回馈券选择
- 自动计算折扣后价格
- 显示升级后获得的新回馈券

## 风控措施

### 🔒 安全机制

1. **支付验证**: 所有支付必须通过官方渠道
2. **行为分析**: 监控异常注册和购买行为
3. **IP 限制**: 同一 IP 地址限制参与数量
4. **时间窗口**: 设置最小间隔时间防止批量操作

### 📊 监控指标

- 每日参与人数
- 回馈券使用率
- 等级升级转化率
- 异常账户标记

## 实施计划

### 阶段 1: 基础功能 (1-2 周)

- [ ] 数据库设计和创建
- [ ] 活动参与 API 开发
- [ ] 弹窗 UI 完善
- [ ] 支付集成

### 阶段 2: 回馈券系统 (2-3 周)

- [ ] 回馈券生成逻辑
- [ ] VIP 升级页面改造
- [ ] 回馈券使用功能
- [ ] 用户中心集成

### 阶段 3: 风控和优化 (1 周)

- [ ] 防刷机制实施
- [ ] 监控系统部署
- [ ] 性能优化
- [ ] 测试和上线
