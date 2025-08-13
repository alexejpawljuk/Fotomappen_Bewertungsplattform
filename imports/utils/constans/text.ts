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

export enum SignupStatus {
    SUCCESS = "Ihr Benutzerkonto wurde erfolgreich erstellt. Sie können sich jetzt anmelden."
}

export enum LoginError {
    EMAIL_INVALID = "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    PASSWORD_TOO_SHORT = "Das Passwort ist zu kurz – bitte wählen Sie ein längeres.",
    INVALID_CREDENTIALS = "Anmeldung fehlgeschlagen – die Zugangsdaten sind ungültig.",
}