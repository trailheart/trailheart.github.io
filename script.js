/* ==========================================================================
   EGEHAN ÇETİNEL (trailheart) — PORTFOLIO INTERACTIVITY SCRIPT
   - Istanbul Live Clock (UTC+03:00)
   - Python Code Execution Sandbox Simulator
   - TrailBot AI Assistant Q&A Drawer
   - Interactive Linux CLI Terminal & Matrix Visualizer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
   * 1. LIVE ISTANBUL TIMEZONE CLOCK
   * ------------------------------------------------------------------------ */
  const clockTimeEl = document.getElementById('clock-time');
  const toggleTzBtn = document.getElementById('btn-toggle-tz-format');
  let is24HourFormat = true;

  function updateIstanbulClock() {
    const now = new Date();
    // Format specifically for Europe/Istanbul timezone
    const options = {
      timeZone: 'Europe/Istanbul',
      hour12: !is24HourFormat,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };

    const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
    if (clockTimeEl) {
      clockTimeEl.textContent = timeString;
    }
  }

  setInterval(updateIstanbulClock, 1000);
  updateIstanbulClock();

  if (toggleTzBtn) {
    toggleTzBtn.addEventListener('click', () => {
      is24HourFormat = !is24HourFormat;
      updateIstanbulClock();
    });
  }

  /* ------------------------------------------------------------------------
   * 2. DISCORD BUTTON COPY TO CLIPBOARD
   * ------------------------------------------------------------------------ */
  const btnDiscord = document.getElementById('btn-discord');
  if (btnDiscord) {
    btnDiscord.addEventListener('click', () => {
      navigator.clipboard.writeText('trailheart').then(() => {
        const originalText = btnDiscord.querySelector('span').textContent;
        btnDiscord.querySelector('span').textContent = 'Copied "trailheart"!';
        setTimeout(() => {
          btnDiscord.querySelector('span').textContent = originalText;
        }, 2200);
      }).catch(err => {
        alert('Discord Handle: trailheart');
      });
    });
  }

  /* ------------------------------------------------------------------------
   * 3. PYTHON CODE SANDBOX EXECUTION SIMULATOR
   * ------------------------------------------------------------------------ */
  const btnRunCode = document.getElementById('btn-run-code');
  const codeOutputPane = document.getElementById('code-output-pane');
  const codeOutputText = document.getElementById('code-output-text');
  const btnCloseOutput = document.getElementById('btn-close-output');

  if (btnRunCode && codeOutputPane && codeOutputText) {
    btnRunCode.addEventListener('click', () => {
      codeOutputPane.classList.remove('hidden');
      codeOutputText.textContent = 'Executing Python 3.11 environment...\n';

      setTimeout(() => {
        codeOutputText.textContent += '>>> Developer object initialized: <__main__.Developer object at 0x7f8a912b40>\n';
      }, 300);

      setTimeout(() => {
        codeOutputText.textContent += '>>> me.name: "Egehan"\n';
        codeOutputText.textContent += '>>> me.age: 15\n';
        codeOutputText.textContent += '>>> me.role: "High School Student"\n';
      }, 700);

      setTimeout(() => {
        codeOutputText.textContent += '>>> me.current_focus(): ["Python", "Linux Architecture", "Cybersecurity Basics"]\n';
        codeOutputText.textContent += '\nProcess finished with exit code 0';
      }, 1200);
    });

    if (btnCloseOutput) {
      btnCloseOutput.addEventListener('click', () => {
        codeOutputPane.classList.add('hidden');
      });
    }
  }

  /* ------------------------------------------------------------------------
   * 4. TRAILBOT AI ASSISTANT CHAT DRAWER
   * ------------------------------------------------------------------------ */
  const btnToggleBot = document.getElementById('btn-toggle-bot');
  const botChatDrawer = document.getElementById('bot-chat-drawer');
  const btnCloseBot = document.getElementById('btn-close-bot');
  const botMessages = document.getElementById('bot-messages');
  const botInputForm = document.getElementById('bot-input-form');
  const botInputText = document.getElementById('bot-input-text');
  const quickPromptChips = document.querySelectorAll('.quick-prompt-chip');

  if (btnToggleBot && botChatDrawer) {
    btnToggleBot.addEventListener('click', () => {
      botChatDrawer.classList.toggle('hidden');
    });

    if (btnCloseBot) {
      btnCloseBot.addEventListener('click', () => {
        botChatDrawer.classList.add('hidden');
      });
    }
  }

  function appendBotMessage(text, isUser = false) {
    if (!botMessages) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${isUser ? 'msg-user' : 'msg-bot'}`;
    msgDiv.textContent = text;
    botMessages.appendChild(msgDiv);
    botMessages.scrollTop = botMessages.scrollHeight;
  }

  function generateBotAnswer(question) {
    const q = question.toLowerCase();
    
    if (q.includes('who') || q.includes('egehan') || q.includes('about')) {
      return "Egehan ÇETİNEL (trailheart) is a 15-year-old high school student studying Electric-Electronics in Istanbul, Türkiye, passionate about Python & Linux architecture.";
    } else if (q.includes('tool') || q.includes('skill') || q.includes('language') || q.includes('tech')) {
      return "Egehan works extensively with Python, Linux Systems, Git, Docker, and cybersecurity concepts. He is actively learning C# and Web development!";
    } else if (q.includes('vespera')) {
      return "Vespera Industries is a collaborative organization where Egehan works alongside teammates building software projects and tools.";
    } else if (q.includes('contact') || q.includes('email') || q.includes('discord')) {
      return "You can reach Egehan via email at contactegehancetinel@gmail.com / trailheart@vesperaindustries.com or on Discord: trailheart.";
    } else if (q.includes('project')) {
      return "Egehan builds Linux system utilities, Python automation scripts, and Vespera Industries projects. Check out his GitHub at github.com/trailheart!";
    } else {
      return `Thanks for asking! Egehan is focused on Electric-Electronics, Linux architecture, and Python. Feel free to connect via contactegehancetinel@gmail.com!`;
    }
  }

  if (botInputForm && botInputText) {
    botInputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userText = botInputText.value.trim();
      if (!userText) return;

      appendBotMessage(userText, true);
      botInputText.value = '';

      setTimeout(() => {
        const answer = generateBotAnswer(userText);
        appendBotMessage(answer, false);
      }, 400);
    });
  }

  quickPromptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const qText = chip.getAttribute('data-question');
      if (qText) {
        appendBotMessage(qText, true);
        setTimeout(() => {
          const answer = generateBotAnswer(qText);
          appendBotMessage(answer, false);
        }, 350);
      }
    });
  });

  /* ------------------------------------------------------------------------
   * 5. INTERACTIVE LINUX CLI TERMINAL MODAL
   * ------------------------------------------------------------------------ */
  const btnOpenTerminal = document.getElementById('btn-open-terminal');
  const terminalModal = document.getElementById('terminal-modal');
  const btnCloseTerminal = document.getElementById('btn-close-terminal');
  const btnCloseTerminalX = document.getElementById('btn-close-terminal-x');
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutputStream = document.getElementById('terminal-output-stream');
  const backdropMatrixCanvas = document.getElementById('backdrop-matrix-canvas');
  let matrixInterval = null;

  let neofetchTypingTimeout = null;

  function stopMatrixMode() {
    if (matrixInterval) {
      clearInterval(matrixInterval);
      matrixInterval = null;
    }
    if (neofetchTypingTimeout) {
      clearTimeout(neofetchTypingTimeout);
      neofetchTypingTimeout = null;
    }
    if (backdropMatrixCanvas) {
      backdropMatrixCanvas.classList.add('hidden');
    }
  }

  function toggleMatrixMode() {
    if (!backdropMatrixCanvas) return;

    if (!backdropMatrixCanvas.classList.contains('hidden')) {
      stopMatrixMode();
      return;
    }

    backdropMatrixCanvas.classList.remove('hidden');
    const ctx = backdropMatrixCanvas.getContext('2d');

    function resizeCanvas() {
      backdropMatrixCanvas.width = window.innerWidth;
      backdropMatrixCanvas.height = window.innerHeight;
    }

    resizeCanvas();

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$&*+=<>?/\\trailheart';
    const fontSize = 16;
    let columns = Math.floor(backdropMatrixCanvas.width / fontSize);
    let drops = new Array(columns).fill(1).map(() => Math.floor(Math.random() * -50));

    if (matrixInterval) clearInterval(matrixInterval);

    matrixInterval = setInterval(() => {
      // Semi-transparent background fill for trailing rain effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, backdropMatrixCanvas.width, backdropMatrixCanvas.height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw bright white leading character
        ctx.fillStyle = '#ffffff';
        ctx.fillText(char, x, y);

        // Draw glowing matrix green trailing body character
        const prevChar = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillStyle = '#10b981';
        ctx.fillText(prevChar, x, y - fontSize);

        if (y > backdropMatrixCanvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 33);
  }

  const terminalInputRow = document.getElementById('terminal-input-row');

  const runNeofetchOutput = () => {
    if (!terminalOutputStream) return;
    terminalOutputStream.innerHTML = '';
    
    if (terminalInputRow) terminalInputRow.classList.add('hidden');
    if (terminalInput) terminalInput.disabled = true;

    if (neofetchTypingTimeout) {
      clearTimeout(neofetchTypingTimeout);
      neofetchTypingTimeout = null;
    }

    const cmdRow = document.createElement('div');
    cmdRow.style.color = '#38bdf8';
    cmdRow.textContent = `trailheart@linux-workstation ~> `;
    terminalOutputStream.appendChild(cmdRow);

    const cmdText = 'neofetch';
    let charIdx = 0;

    function typeChar() {
      if (charIdx < cmdText.length) {
        cmdRow.textContent += cmdText.charAt(charIdx);
        charIdx++;
        neofetchTypingTimeout = setTimeout(typeChar, 65);
      } else {
        // Pause 1 second for realistic execution delay before printing system output
        neofetchTypingTimeout = setTimeout(() => {
          const replyDiv = document.createElement('div');
          replyDiv.style.color = '#34d399';
          replyDiv.style.whiteSpace = 'pre-wrap';
          replyDiv.textContent = `       .---.         trailheart@workstation\n` +
                                `      /     \\        ----------------------\n` +
                                `     (  (O)  )       OS: Linux (Egehan Custom Workstation)\n` +
                                `      \\  _  /        Host: trailheart-arch-x86_64\n` +
                                `       /   \\         Kernel: 6.8.0-custom-egehan\n` +
                                `      /     \\        Uptime: 15 days, 8 hours, 42 mins\n` +
                                `     (  / \\  )       Shell: fish 3.7.0\n` +
                                `     \`"\`   \`"\`       Tools: Python, Linux, Git, CustomTkinter\n` +
                                `                     Focus: Linux Architecture & Cyber Security\n` +
                                `                     Org: Vespera Industries\n` +
                                `                     Location: Istanbul, Türkiye (UTC+03:00)`;
          terminalOutputStream.appendChild(replyDiv);

          // Show typing input row and enable input after neofetch completes
          if (terminalInputRow) terminalInputRow.classList.remove('hidden');
          if (terminalInput) {
            terminalInput.disabled = false;
            terminalInput.focus();
          }

          const terminalBody = document.getElementById('terminal-body');
          if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;
        }, 1000);
      }
    }

    typeChar();
  };

  if (btnOpenTerminal && terminalModal) {
    btnOpenTerminal.addEventListener('click', () => {
      terminalModal.classList.remove('hidden');
      stopMatrixMode();
      runNeofetchOutput();
      if (terminalInput) terminalInput.focus();
    });

    const closeTerminal = () => {
      stopMatrixMode();
      terminalModal.classList.add('hidden');
    };

    if (btnCloseTerminal) btnCloseTerminal.addEventListener('click', closeTerminal);
    if (btnCloseTerminalX) btnCloseTerminalX.addEventListener('click', closeTerminal);
  }

  // Handle Terminal Input Commands
  if (terminalInput && terminalOutputStream) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const rawCmd = terminalInput.value.trim();
        terminalInput.value = '';
        if (!rawCmd) return;

        // Render command line prompt entry
        const cmdRow = document.createElement('div');
        cmdRow.style.color = '#38bdf8';
        cmdRow.textContent = `trailheart@linux-workstation ~> ${rawCmd}`;
        terminalOutputStream.appendChild(cmdRow);

        const cmd = rawCmd.toLowerCase();
        let replyOutput = '';

        switch (cmd) {
          case 'help':
            replyOutput = `Available commands:\n` +
                          `  neofetch  - Fastfetch / System overview & ASCII art\n` +
                          `  whoami    - Display user identity & profile\n` +
                          `  skills    - List primary technical skills & tools\n` +
                          `  projects  - Show featured projects\n` +
                          `  contact   - Display contact details\n` +
                          `  date      - Print current Istanbul local time\n` +
                          `  matrix    - Toggle retro Matrix digital rain inside terminal\n` +
                          `  clear     - Clear terminal screen\n` +
                          `  exit      - Close terminal modal`;
            break;

          case 'neofetch':
          case 'fastfetch':
          case 'fetch':
            replyOutput = `       .---.         trailheart@workstation\n` +
                          `      /     \\        ----------------------\n` +
                          `     (  (O)  )       OS: Linux (Egehan Custom Workstation)\n` +
                          `      \\  _  /        Host: trailheart-arch-x86_64\n` +
                          `       /   \\         Kernel: 6.8.0-custom-egehan\n` +
                          `      /     \\        Uptime: 15 days, 8 hours, 42 mins\n` +
                          `     (  / \\  )       Shell: fish 3.7.0\n` +
                          `     \`"\`   \`"\`       Tools: Python, Linux, Git, CustomTkinter\n` +
                          `                     Focus: Linux Architecture & Cyber Security\n` +
                          `                     Org: Vespera Industries\n` +
                          `                     Location: Istanbul, Türkiye (UTC+03:00)`;
            break;

          case 'whoami':
            replyOutput = `trailheart (Egehan ÇETİNEL)\n` +
                          `High School Student studying Electric-Electronics\n` +
                          `Location: Istanbul, Türkiye | Org: Vespera Industries`;
            break;

          case 'skills':
            replyOutput = `Primary Arsenal:\n` +
                          `  • Python 3 & CustomTkinter\n  • Linux Kernel Architecture\n  • Git & Version Control\n` +
                          `Expanding into:\n  • Cyber Security Fundamentals\n  • Flask Web Framework\n  • C# / .NET\n  • Web Development (HTML5/CSS3)`;
            break;

          case 'projects':
            replyOutput = `1. Vespera Industries Software Tools\n` +
                          `2. Python Security Automation Scripts\n` +
                          `GitHub Repositories: https://github.com/trailheart`;
            break;

          case 'contact':
            replyOutput = `Personal Email : contactegehancetinel@gmail.com\n` +
                          `Co. Email       : trailheart@vesperaindustries.com\n` +
                          `Discord Handle  : trailheart`;
            break;

          case 'date':
            replyOutput = `Istanbul Time: ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Istanbul' })}`;
            break;

          case 'matrix':
            toggleMatrixMode();
            replyOutput = `[Matrix digital rain toggled inside terminal]`;
            break;

          case 'clear':
            terminalOutputStream.innerHTML = '';
            return;

          case 'exit':
          case 'quit':
            stopMatrixMode();
            terminalModal.classList.add('hidden');
            return;

          default:
            replyOutput = `Command not recognized: '${rawCmd}'. Type 'help' for available commands.`;
            break;
        }

        const replyDiv = document.createElement('div');
        replyDiv.style.color = '#34d399';
        replyDiv.style.whiteSpace = 'pre-wrap';
        replyDiv.textContent = replyOutput;
        terminalOutputStream.appendChild(replyDiv);

        // Auto-scroll terminal to bottom
        const terminalBody = document.getElementById('terminal-body');
        if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    });
  }

});
