import {
    LoggerFactoryOptions,
    LFService,
    LogGroupRule,
    LogLevel
  } from "typescript-logging";
  
  // https://github.com/mreuvers/typescript-logging
  
  type LogConfig = {
    regExp: string;
    logLevel: LogLevel;
  };
  
  const logConfigs: LogConfig[] = [
    { regExp: "Services.+", logLevel: LogLevel.Info },
    { regExp: "Utils.+", logLevel: LogLevel.Info },
    { regExp: "Components.+", logLevel: LogLevel.Info },
    { regExp: ".+", logLevel: LogLevel.Info }
  ];
  
  const options = new LoggerFactoryOptions();
  logConfigs.forEach(logConfig => {
    options.addLogGroupRule(
      new LogGroupRule(new RegExp(logConfig.regExp), logConfig.logLevel)
    );
  });
  
  // Create a named loggerfactory and pass in the options and export the factory.
  // Named is since version 0.2.+ (it's recommended for future usage)
  export const factory = LFService.createNamedLoggerFactory(
    "LoggerFactory",
    options
  );
  