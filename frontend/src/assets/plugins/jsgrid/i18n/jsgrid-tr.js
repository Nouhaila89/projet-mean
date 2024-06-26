(function(jsGrid) {

    jsGrid.locales.tr = {
        grid: {
            noDataContent: "Aucune donnée trouvée",
            deleteConfirm: "Êtes-vous sûr(e) ?",
            pagerFormat: "Pages : {first} {prev} {pages} {next} {last} &nbsp;&nbsp; {pageIndex} / {pageCount}",
            pagePrevText: "<",
            pageNextText: ">",
            pageFirstText: "<<",
            pageLastText: ">>",
            loadMessage: "Veuillez patienter...",
            invalidMessage: "Saisie de données invalide !"
        },

        loadIndicator: {
            message: "Chargement en cours..."
        },

        fields: {
            control: {
                searchModeButtonTooltip: "Passer en mode recherche",
                insertModeButtonTooltip: "Passer en mode d'ajout",
                editButtonTooltip: "Modifier",
                deleteButtonTooltip: "Supprimer",
                searchButtonTooltip: "Rechercher",
                clearFilterButtonTooltip: "Effacer le filtre",
                insertButtonTooltip: "Ajouter",
                updateButtonTooltip: "Mettre à jour",
                cancelEditButtonTooltip: "Annuler la modification"
            }
        },

        validators: {
            required: { message: "Champ requis" },
            rangeLength: { message: "La longueur de la valeur du champ est en dehors de la plage définie" },
            minLength: { message: "La valeur du champ est trop courte" },
            maxLength: { message: "La valeur du champ est trop longue" },
            pattern: { message: "La valeur du champ ne correspond pas au modèle défini" },
            range: { message: "La valeur du champ est en dehors de la plage définie" },
            min: { message: "La valeur du champ est trop petite" },
            max: { message: "La valeur du champ est trop grande" }
        }
    };

}(jsGrid, jQuery));
