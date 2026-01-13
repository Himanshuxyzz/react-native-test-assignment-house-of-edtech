export const videoListHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Course Content</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f7fa;
      min-height: 100vh;
      -webkit-tap-highlight-color: transparent;
    }

    .course-header {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      padding: 20px 16px;
      color: #fff;
    }

    .course-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .course-meta {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 12px;
      opacity: 0.9;
    }

    .course-meta span {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .progress-bar {
      background: rgba(255, 255, 255, 0.2);
      height: 6px;
      border-radius: 3px;
      margin-top: 12px;
      overflow: hidden;
    }

    .progress-fill {
      background: #fff;
      height: 100%;
      width: 35%;
      border-radius: 3px;
    }

    .progress-text {
      font-size: 11px;
      margin-top: 6px;
      opacity: 0.9;
    }

    .content-wrapper {
      padding: 12px;
    }

    .section {
      background: #fff;
      border-radius: 12px;
      margin-bottom: 12px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    .section-header {
      padding: 14px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      background: #fafafa;
    }

    .section-title {
      font-size: 14px;
      font-weight: 600;
      color: #1a1a1a;
    }

    .section-meta {
      font-size: 11px;
      color: #888;
    }

    .lesson-list {
      list-style: none;
    }

    .lesson-item {
      display: flex;
      align-items: center;
      padding: 14px 16px;
      border-bottom: 1px solid #f0f0f0;
      cursor: pointer;
      transition: background 0.15s ease;
      gap: 12px;
    }

    .lesson-item:last-child {
      border-bottom: none;
    }

    .lesson-item:active {
      background: #f5f5f5;
    }

    .lesson-item.completed .status-icon {
      background: #10b981;
      border-color: #10b981;
    }

    .lesson-item.completed .status-icon svg {
      display: block;
    }

    .lesson-item.current {
      background: #f0f4ff;
      border-left: 3px solid #6366f1;
    }

    .lesson-item.locked {
      opacity: 0.5;
      pointer-events: none;
    }

    .status-icon {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 2px solid #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .status-icon svg {
      width: 12px;
      height: 12px;
      fill: #fff;
      display: none;
    }

    .lesson-item.current .status-icon {
      border-color: #6366f1;
      background: #6366f1;
    }

    .lesson-item.current .status-icon::after {
      content: '';
      width: 8px;
      height: 8px;
      background: #fff;
      border-radius: 50%;
    }

    .lesson-content {
      flex: 1;
      min-width: 0;
    }

    .lesson-title {
      font-size: 13px;
      font-weight: 500;
      color: #333;
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .lesson-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      color: #888;
    }

    .lesson-type {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .lesson-type svg {
      width: 12px;
      height: 12px;
      fill: #888;
    }

    .lesson-duration {
      color: #666;
    }

    .play-btn {
      width: 32px;
      height: 32px;
      background: #6366f1;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      opacity: 0;
      transition: opacity 0.15s ease;
    }

    .lesson-item:active .play-btn,
    .lesson-item.current .play-btn {
      opacity: 1;
    }

    .play-btn svg {
      width: 12px;
      height: 12px;
      fill: #fff;
      margin-left: 2px;
    }

    .lesson-item.locked .lock-icon {
      display: flex;
    }

    .lock-icon {
      width: 20px;
      height: 20px;
      display: none;
      align-items: center;
      justify-content: center;
    }

    .lock-icon svg {
      width: 14px;
      height: 14px;
      fill: #999;
    }

    .badge {
      display: inline-block;
      padding: 2px 6px;
      font-size: 10px;
      font-weight: 600;
      border-radius: 4px;
      text-transform: uppercase;
    }

    .badge-new {
      background: #dcfce7;
      color: #16a34a;
    }

    .badge-preview {
      background: #e0e7ff;
      color: #6366f1;
    }
  </style>
</head>
<body>
  <div class="course-header">
    <div class="course-title">Complete React Native Masterclass</div>
    <div class="course-meta">
      <span>📚 24 Lessons</span>
      <span>⏱️ 4h 30m</span>
      <span>📊 Intermediate</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill"></div>
    </div>
    <div class="progress-text">35% Complete • 8 of 24 lessons</div>
  </div>

  <div class="content-wrapper">
    <!-- Section 1 -->
    <div class="section">
      <div class="section-header">
        <div class="section-title">📖 Section 1: Getting Started</div>
        <div class="section-meta">4 lessons • 45 min</div>
      </div>
      <ul class="lesson-list">
        <li class="lesson-item completed" onclick="openVideo('lesson-1-1')">
          <div class="status-icon">
            <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
          </div>
          <div class="lesson-content">
            <div class="lesson-title">Introduction to React Native</div>
            <div class="lesson-meta">
              <span class="lesson-type">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Video
              </span>
              <span class="lesson-duration">8:24</span>
            </div>
          </div>
          <div class="play-btn">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </li>
        <li class="lesson-item completed" onclick="openVideo('lesson-1-2')">
          <div class="status-icon">
            <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
          </div>
          <div class="lesson-content">
            <div class="lesson-title">Setting Up Development Environment</div>
            <div class="lesson-meta">
              <span class="lesson-type">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Video
              </span>
              <span class="lesson-duration">12:30</span>
            </div>
          </div>
          <div class="play-btn">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </li>
        <li class="lesson-item completed" onclick="openVideo('lesson-1-3')">
          <div class="status-icon">
            <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
          </div>
          <div class="lesson-content">
            <div class="lesson-title">Your First React Native App</div>
            <div class="lesson-meta">
              <span class="lesson-type">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Video
              </span>
              <span class="lesson-duration">15:45</span>
            </div>
          </div>
          <div class="play-btn">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </li>
        <li class="lesson-item completed" onclick="openVideo('lesson-1-4')">
          <div class="status-icon">
            <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
          </div>
          <div class="lesson-content">
            <div class="lesson-title">Understanding Core Components</div>
            <div class="lesson-meta">
              <span class="lesson-type">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Video
              </span>
              <span class="lesson-duration">9:15</span>
            </div>
          </div>
          <div class="play-btn">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </li>
      </ul>
    </div>

    <!-- Section 2 -->
    <div class="section">
      <div class="section-header">
        <div class="section-title">🎨 Section 2: Styling & Layout</div>
        <div class="section-meta">5 lessons • 1h 10min</div>
      </div>
      <ul class="lesson-list">
        <li class="lesson-item completed" onclick="openVideo('lesson-2-1')">
          <div class="status-icon">
            <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
          </div>
          <div class="lesson-content">
            <div class="lesson-title">Introduction to StyleSheet</div>
            <div class="lesson-meta">
              <span class="lesson-type">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Video
              </span>
              <span class="lesson-duration">10:20</span>
            </div>
          </div>
          <div class="play-btn">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </li>
        <li class="lesson-item completed" onclick="openVideo('lesson-2-2')">
          <div class="status-icon">
            <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
          </div>
          <div class="lesson-content">
            <div class="lesson-title">Flexbox Layout Deep Dive</div>
            <div class="lesson-meta">
              <span class="lesson-type">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Video
              </span>
              <span class="lesson-duration">18:40</span>
            </div>
          </div>
          <div class="play-btn">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </li>
        <li class="lesson-item completed" onclick="openVideo('lesson-2-3')">
          <div class="status-icon">
            <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
          </div>
          <div class="lesson-content">
            <div class="lesson-title">Responsive Design Patterns</div>
            <div class="lesson-meta">
              <span class="lesson-type">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Video
              </span>
              <span class="lesson-duration">14:15</span>
            </div>
          </div>
          <div class="play-btn">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </li>
        <li class="lesson-item current" onclick="openVideo('lesson-2-4')">
          <div class="status-icon"></div>
          <div class="lesson-content">
            <div class="lesson-title">Building Custom Components</div>
            <div class="lesson-meta">
              <span class="lesson-type">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Video
              </span>
              <span class="lesson-duration">22:30</span>
              <span class="badge badge-new">Current</span>
            </div>
          </div>
          <div class="play-btn">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </li>
        <li class="lesson-item" onclick="openVideo('lesson-2-5')">
          <div class="status-icon"></div>
          <div class="lesson-content">
            <div class="lesson-title">Theme & Dark Mode Implementation</div>
            <div class="lesson-meta">
              <span class="lesson-type">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Video
              </span>
              <span class="lesson-duration">16:50</span>
            </div>
          </div>
          <div class="play-btn">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </li>
      </ul>
    </div>

    <!-- Section 3 -->
    <div class="section">
      <div class="section-header">
        <div class="section-title">🚀 Section 3: Navigation</div>
        <div class="section-meta">4 lessons • 55 min</div>
      </div>
      <ul class="lesson-list">
        <li class="lesson-item" onclick="openVideo('lesson-3-1')">
          <div class="status-icon"></div>
          <div class="lesson-content">
            <div class="lesson-title">React Navigation Setup</div>
            <div class="lesson-meta">
              <span class="lesson-type">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Video
              </span>
              <span class="lesson-duration">11:20</span>
              <span class="badge badge-preview">Preview</span>
            </div>
          </div>
          <div class="play-btn">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </li>
        <li class="lesson-item" onclick="openVideo('lesson-3-2')">
          <div class="status-icon"></div>
          <div class="lesson-content">
            <div class="lesson-title">Stack Navigator Mastery</div>
            <div class="lesson-meta">
              <span class="lesson-type">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Video
              </span>
              <span class="lesson-duration">14:45</span>
            </div>
          </div>
          <div class="play-btn">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </li>
        <li class="lesson-item" onclick="openVideo('lesson-3-3')">
          <div class="status-icon"></div>
          <div class="lesson-content">
            <div class="lesson-title">Tab & Drawer Navigation</div>
            <div class="lesson-meta">
              <span class="lesson-type">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Video
              </span>
              <span class="lesson-duration">18:30</span>
            </div>
          </div>
          <div class="play-btn">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </li>
        <li class="lesson-item locked">
          <div class="status-icon"></div>
          <div class="lesson-content">
            <div class="lesson-title">Deep Linking & Universal Links</div>
            <div class="lesson-meta">
              <span class="lesson-type">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Video
              </span>
              <span class="lesson-duration">12:10</span>
            </div>
          </div>
          <div class="lock-icon">
            <svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
          </div>
        </li>
      </ul>
    </div>

    <!-- Section 4 -->
    <div class="section">
      <div class="section-header">
        <div class="section-title">🔐 Section 4: State Management</div>
        <div class="section-meta">3 lessons • 48 min</div>
      </div>
      <ul class="lesson-list">
        <li class="lesson-item locked">
          <div class="status-icon"></div>
          <div class="lesson-content">
            <div class="lesson-title">useState & useReducer Patterns</div>
            <div class="lesson-meta">
              <span class="lesson-type">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Video
              </span>
              <span class="lesson-duration">15:20</span>
            </div>
          </div>
          <div class="lock-icon">
            <svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
          </div>
        </li>
        <li class="lesson-item locked">
          <div class="status-icon"></div>
          <div class="lesson-content">
            <div class="lesson-title">Context API Best Practices</div>
            <div class="lesson-meta">
              <span class="lesson-type">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Video
              </span>
              <span class="lesson-duration">18:40</span>
            </div>
          </div>
          <div class="lock-icon">
            <svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
          </div>
        </li>
        <li class="lesson-item locked">
          <div class="status-icon"></div>
          <div class="lesson-content">
            <div class="lesson-title">Zustand & Redux Toolkit</div>
            <div class="lesson-meta">
              <span class="lesson-type">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Video
              </span>
              <span class="lesson-duration">14:30</span>
            </div>
          </div>
          <div class="lock-icon">
            <svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <script>
    function openVideo(lessonId) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'openVideo',
        lessonId: lessonId
      }));
    }
  </script>
</body>
</html>
`;
