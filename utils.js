const available_commands = [
  "migrate",
  "init",
  "connect"
] 

export function command_is_valid( command) {
  return available_commands.includes(command)
}
