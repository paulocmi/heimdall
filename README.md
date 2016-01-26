1. Clonar o Projeto 'qa.vcs.gateway.connectortest'.

2. Utilizar o comando npm install para instalar as dependências do projeto. 
	Caso não tenha o npm, baixar o nodeJs e npm.
	
3. Criar a seguinte estrutura:
	'C:\GatewayConnectorTest\' -> Instalar o Jmeter nesta pasta para poder ser executado.
	'C:\GatewayConnectorTest\Jmeter_2.13\bin\jmeter.bat'
	
4. Adicionar a pasta Tests dentro de 'C:\GatewayConnectorTest\'

5. Acessar a pasta qa.vcs.gateway.connectortest e executar o comando 'grunt'.

6. O ambiente estará disponível em localhost 'http://localhost:3000/'.
OBS: Para correto funcionamento do teste, deve-se atualizar a chaves de acesso em 'C:\aws_credentials_path\'.
