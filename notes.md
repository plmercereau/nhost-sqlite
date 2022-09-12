## Build metadata

```bash
curl -X POST -H "x-hasura-admin-secret:nhost-admin-secret" -d @export_command.json http://localhost:1337/v1/metadata > export.json
```

<!-- curl -X POST -H "x-hasura-admin-secret:nhost-admin-secret" -d @metadata.json http://localhost:1337/v1/metadata -->

merge the stuff with `metadata.json` into `merged.json`...

## Load metadasta

```bash
curl -X POST -H "x-hasura-admin-secret:nhost-admin-secret" -d @merged.json http://localhost:1337/v1/metadata
```

reload metadata

## Export metadata locally

```bash
cd nhost
hasura metadata export --endpoint http://localhost:8080 --admin-secret nhost-admin-secret
```

--> failure
