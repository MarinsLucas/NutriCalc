import pandas as pd

# Supondo que suas tabelas estejam em arquivos CSV. Substitua 'table1.csv' e 'table2.csv' pelos nomes dos seus arquivos.
table1 = pd.read_csv('tabela1.csv',  encoding='latin1')  # Tabela 1 com ID e outras colunas
table2 = pd.read_csv('tabela2.csv',  encoding='latin1')  # Tabela 2 com ID e outras colunas

# Fazendo o merge das tabelas com base no ID
df_merged = pd.merge(table1, table2, on='ID', how='outer')

# Salvando a tabela combinada em um novo arquivo CSV
df_merged.to_csv('combined_table.csv', index=False)

print("As tabelas foram combinadas com sucesso e salvas em 'combined_table.csv'.")
