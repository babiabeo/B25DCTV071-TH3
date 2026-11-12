import React from "react";

interface ClockState {
  currentTime: Date;
}

class Clock extends React.Component<Record<string, never>, ClockState> {
  private timer?: ReturnType<typeof setInterval>;

  state: ClockState = { currentTime: new Date() };

  componentDidMount(): void {
    this.timer = setInterval(() => {
      this.setState({ currentTime: new Date() });
    }, 1000);
  }

  componentWillUnmount(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render(): React.ReactNode {
    const { currentTime } = this.state;

    return (
      <time className="clock" dateTime={currentTime.toISOString()}>
        {currentTime.toLocaleTimeString("vi-VN")}
      </time>
    );
  }
}

class Header extends React.Component {
  render(): React.ReactNode {
    return (
      <header className="app-header">
          <h1 className="title">Sổ chi tiêu cá nhân</h1>
        <Clock />
      </header>
    );
  }
}

export default Header;
