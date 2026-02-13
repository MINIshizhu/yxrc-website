/* ===================================
   表单处理脚本
   =================================== */

// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  initContactForm();
  initInquiryForm();
});

/* 联系表单处理 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // 验证表单
    if (!validateForm(form)) {
      return;
    }

    // 获取表单数据
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // 显示加载状态
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = '提交中...';
    submitBtn.classList.add('loading');

    try {
      // 模拟发送到服务器
      // 实际项目中应该替换为真实的 API 端点
      await simulateFormSubmission(data);

      // 成功处理
      showNotification('提交成功！我们会尽快与您联系。', 'success');
      form.reset();

    } catch (error) {
      // 错误处理
      console.error('表单提交失败:', error);
      showNotification('提交失败，请稍后重试或直接拨打电话。', 'error');

    } finally {
      // 恢复按钮状态
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      submitBtn.classList.remove('loading');
    }
  });
}

/* 询价表单处理 */
function initInquiryForm() {
  const form = document.getElementById('inquiryForm');
  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // 验证表单
    if (!validateForm(form)) {
      return;
    }

    // 获取表单数据
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // 显示加载状态
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = '提交中...';
    submitBtn.classList.add('loading');

    try {
      // 模拟发送到服务器
      await simulateFormSubmission(data);

      // 成功处理
      showNotification('询价已提交！我们的销售人员会尽快联系您。', 'success');
      form.reset();

      // 关闭模态框（如果有）
      const modal = document.querySelector('.modal.active');
      if (modal) {
        modal.classList.remove('active');
      }

    } catch (error) {
      console.error('询价提交失败:', error);
      showNotification('提交失败，请稍后重试。', 'error');

    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      submitBtn.classList.remove('loading');
    }
  });
}

/* 表单验证 */
function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

  // 清除之前的错误提示
  clearErrors(form);

  inputs.forEach(input => {
    // 检查是否为空
    if (!input.value.trim()) {
      showError(input, '此字段为必填项');
      isValid = false;
      return;
    }

    // 验证邮箱
    if (input.type === 'email' && !isValidEmail(input.value)) {
      showError(input, '请输入有效的邮箱地址');
      isValid = false;
      return;
    }

    // 验证手机号
    if (input.type === 'tel' && !isValidPhone(input.value)) {
      showError(input, '请输入有效的手机号码');
      isValid = false;
      return;
    }
  });

  return isValid;
}

/* 显示错误信息 */
function showError(input, message) {
  // 添加错误样式
  input.classList.add('error');

  // 创建错误提示元素
  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-error';
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    color: #ff4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    animation: fadeIn 0.3s ease;
  `;

  // 插入错误提示
  input.parentNode.appendChild(errorDiv);

  // 聚焦到第一个错误字段
  if (document.querySelectorAll('.form-error').length === 1) {
    input.focus();
  }
}

/* 清除错误信息 */
function clearErrors(form) {
  const errors = form.querySelectorAll('.form-error');
  errors.forEach(error => error.remove());

  const inputs = form.querySelectorAll('.error');
  inputs.forEach(input => input.classList.remove('error'));
}

/* 邮箱验证 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/* 手机号验证（中国大陆） */
function isValidPhone(phone) {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
}

/* 模拟表单提交 */
function simulateFormSubmission(data) {
  return new Promise((resolve, reject) => {
    // 模拟网络延迟
    setTimeout(() => {
      // 模拟成功/失败（90%成功率）
      if (Math.random() > 0.1) {
        console.log('表单数据:', data);
        resolve({ success: true });
      } else {
        reject(new Error('网络错误'));
      }
    }, 1500);
  });
}

/* 显示通知 */
function showNotification(message, type = 'info') {
  // 移除现有通知
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // 创建通知元素
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">${getNotificationIcon(type)}</span>
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;

  // 添加样式
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    max-width: 400px;
    background: ${getNotificationColor(type)};
    color: white;
    padding: 16px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    animation: slideInRight 0.3s ease;
  `;

  const content = notification.querySelector('.notification-content');
  content.style.cssText = `
    display: flex;
    align-items: center;
    gap: 12px;
  `;

  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    margin-left: auto;
    opacity: 0.7;
    transition: opacity 0.3s;
  `;

  closeBtn.addEventListener('mouseover', () => closeBtn.style.opacity = '1');
  closeBtn.addEventListener('mouseout', () => closeBtn.style.opacity = '0.7');
  closeBtn.addEventListener('click', () => removeNotification(notification));

  // 添加到页面
  document.body.appendChild(notification);

  // 自动关闭
  setTimeout(() => removeNotification(notification), 5000);
}

/* 获取通知图标 */
function getNotificationIcon(type) {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };
  return icons[type] || icons.info;
}

/* 获取通知颜色 */
function getNotificationColor(type) {
  const colors = {
    success: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
    error: 'linear-gradient(135deg, #ff4444 0%, #ff6b6b 100%)',
    warning: 'linear-gradient(135deg, #ff9800 0%, #ffb84d 100%)',
    info: 'linear-gradient(135deg, #0066ff 0%, #00d4ff 100%)'
  };
  return colors[type] || colors.info;
}

/* 移除通知 */
function removeNotification(notification) {
  notification.style.animation = 'slideOutRight 0.3s ease';
  setTimeout(() => notification.remove(), 300);
}

/* 实时验证（可选） */
function initRealTimeValidation() {
  const inputs = document.querySelectorAll('input, textarea, select');

  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.hasAttribute('required') && !this.value.trim()) {
        showError(this, '此字段为必填项');
      } else {
        // 清除该字段的错误
        const error = this.parentNode.querySelector('.form-error');
        if (error) error.remove();
        this.classList.remove('error');
      }
    });

    // 输入时清除错误
    input.addEventListener('input', function() {
      this.classList.remove('error');
      const error = this.parentNode.querySelector('.form-error');
      if (error) error.remove();
    });
  });
}

/* 添加动画关键帧 */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(styleSheet);
