// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
pub mod data;
mod tauri_commands;
pub use crate::tauri_commands::command;
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            command::add_savedata,
            command::get_all_series_master_list,
            command::get_all_pokemon_master_list,
            command::get_all_savedata_list,
            command::get_savedata,
            command::get_savedata_with_all_series,
            command::get_pokemon,
            command::save_pokemon
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
