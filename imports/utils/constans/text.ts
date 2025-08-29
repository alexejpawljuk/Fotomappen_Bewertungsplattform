export enum Verification {
    SUCCESS  = "E-Mail-Verifizierung erfolgreich abgeschlossen.",
    ERROR = "E-Mail-Verifizierung fehlgeschlagen.",
    UNVERIFIED = "Bitte bestätigen Sie Ihre E-Mail-Adresse.",
    SEND_VERIFICATION_EMAIL = "Wir haben Ihnen eine E-Mail zur Bestätigung Ihrer Adresse gesendet."
}

export enum SignupError {
    EMAIL_INVALID = "Bitte geben Sie eine gültige E-Mail-Adresse ein",
    EMAIL_TAKEN = "Diese E-Mail-Adresse ist bereits vergeben.",
    CLUB_NAME_TOO_SHORT = "Der Clubname ist zu kurz",
    CLUB_NAME_INVALID_CHARS = "Bitte verwenden Sie im Clubnamen nur Buchstaben und Zahlen.",
    COMMUNITY_REQUIRED = "Bitte wählen Sie eine Community aus",
    COMMUNITY_NOT_FOUND = "Die ausgewählte Community wurde nicht gefunden.",
    PASSWORD_TOO_SHORT = "Das Passwort ist zu kurz – bitte wählen Sie ein längeres.",
}

export enum PhotoAlbumError {
    PHOTO_ALBUM_TITLE_INVALID = "Bitte verwenden Sie im Title nur Buchstaben und Zahlen.",
    PHOTO_ALBUM_TITLE_TO_LONG = "Der Titel ist zu lang, es sind maximal 16 Zeichen erlaubt.",
    PHOTO_ALBUM_TITLE_TO_SHORT = "Der Titel ist zu kurz, es sind minimal 4 Zeichen erlaubt.",
    PHOTO_ALBUM_TITLE_TAKEN = "Dieser Titel ist bereits vergeben.",
    PHOTO_ALBUM_ACCESS = "Album nicht gefunden oder fehlende Berechtigung.",
}

export enum PhotoAlbumStatus {
    SUCCESS = "wurde erfolgreich erstellt.",
    // ERROR = "Der Album konnte nicht erstellt werden.",
}

export enum PhotoError {
    PHOTO_TITLE_TAKEN = "Dieser Titel ist bereits vergeben.",
    PHOTO_TITLE_TO_SHORT = "Der Titel ist zu kurz, es sind minimal 4 Zeichen erlaubt.",
    PHOTO_TITLE_EMPTY = "Bitte geben Sie einen Titel ein.",
    PHOTOGRAPHER_FIRSTNAME_EMPTY = "Bitte geben Sie den Vornamen des Fotografen ein.",
    PHOTOGRAPHER_FIRSTNAME_TOO_SHORT = "Der Vorname des Fotografen ist zu kurz, es sind minimal 4 Zeichen erlaubt.",
    PHOTOGRAPHER_LASTNAME_EMPTY = "Bitte geben Sie den Nachnamen des Fotografen ein.",
    PHOTOGRAPHER_LASTNAME_TOO_SHORT = "Der Nachname des Fotografen ist zu kurz, es sind minimal 4 Zeichen erlaubt.",
}


export enum SignupStatus {
    SUCCESS = "Ihr Benutzerkonto wurde erfolgreich erstellt. Sie können sich jetzt anmelden."
}

export enum LoginError {
    EMAIL_INVALID = "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    PASSWORD_TOO_SHORT = "Das Passwort ist zu kurz – bitte wählen Sie ein längeres.",
    INVALID_CREDENTIALS = "Anmeldung fehlgeschlagen – die Zugangsdaten sind ungültig.",
}