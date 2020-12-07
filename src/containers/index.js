import * as React from "react";
import {
	View,
	Panel,
	withAdaptivity,
	ModalRoot,
	ModalPage,
	ModalPageHeader,
	Group,
	SplitLayout,
	SplitCol,
	ViewWidth,
	PanelHeader,
	Cell,
	Alert,
	Separator,
	Placeholder,
	Button,
	Avatar,
	Snackbar,
	PanelHeaderButton,
	IS_PLATFORM_ANDROID,
	IS_PLATFORM_IOS,
	InfoRow,
	FormItem,
	SelectMimicry,
	Radio,
	Checkbox,
	Input,
	DatePicker,
	SimpleCell,
	Header,
	IconButton,
	CellButton
} from "@vkontakte/vkui";
import {
	Icon16MoreVertical,
	Icon56MessageReadOutline,
	Icon28DevicesOutline,
	Icon28CheckShieldDeviceOutline,
	Icon28KeyOutline,
	Icon28MailOutline,
	Icon28PhoneOutline,
	Icon24Cancel,
	Icon24Done
} from "@vkontakte/icons";
import '@vkontakte/vkui/dist/vkui.css';

const panels = ["panel 1", "panel 2", "panel 3"];
const modals = ["modal 1", "modal 2"];

export const App = withAdaptivity(
	({ viewWidth }) => {
		const [panel, setPanel] = React.useState(panels[0]);
		const [modal, setModal] = React.useState(null);
		const [popout, setPopout] = React.useState(null);
		const [snackbar, setSnackbar] = React.useState(null);

		const showSnackbar = () =>
			setSnackbar(
				<Snackbar
					onClose={() => setSnackbar(null)}
					after={
						<Avatar
							src={"https://sun9-4.userapi.com/oDjqp-AYVog1kuee5JOjzP9fMOvzCWCGBY0YHg/WW88aTocBxA.jpg?ava=1"}
							size={32}
						/>
					}
				>
					Отправлено Ивану Барышеву
        </Snackbar>
			);

		const showAlert = () =>
			setPopout(
				<Alert
					actions={[{
						title: 'Отмена',
						autoclose: true,
						mode: 'cancel'
					}, {
						title: 'Удалить',
						autoclose: true,
						mode: 'destructive',
					}]}
					actionsLayout="horizontal"
					onClose={() => setPopout(null)}
					header="Удаление документа"
					text="Вы уверены, что хотите удалить этот документ?"
				/>);

		const modalRoot = (
			<ModalRoot activeModal={modal}>
				<ModalPage
					id={modals[0]}
					header={
						<ModalPageHeader
							left={IS_PLATFORM_ANDROID && <PanelHeaderButton onClick={() => setModal(null)}><Icon24Cancel /></PanelHeaderButton>}
						>
							Информация о пользователе
						</ModalPageHeader>
					}
				>
					<Group>
						<Cell>
							<InfoRow header="Дата рождения">
								30 января 1993
              				</InfoRow>
						</Cell>
						<Cell>
							<InfoRow header="Родной город">
								Ереван
              				</InfoRow>
						</Cell>
						<Cell>
							<InfoRow header="Место работы">
								Команда ВКонтакте
              				</InfoRow>
						</Cell>
					</Group>
				</ModalPage>
				<ModalPage
					id={modals[1]}
					onClose={() => setModal(null)}
					header={
						<ModalPageHeader
							left={IS_PLATFORM_ANDROID && <PanelHeaderButton onClick={() => setModal(null)}><Icon24Cancel /></PanelHeaderButton>}
							right={<PanelHeaderButton onClick={() => setModal(null)} >{IS_PLATFORM_IOS ? 'Готово' : <Icon24Done />}</PanelHeaderButton>}
						>
							Фильтры
						</ModalPageHeader>
					}
				>
					<Group>

						<FormItem top="Город">
							<SelectMimicry placeholder="Выбрать город" disabled />
						</FormItem>

						<FormItem top="Пол">
							<Radio name="sex" value={0} defaultChecked>Любой</Radio>
							<Radio name="sex" value={1}>Мужской</Radio>
							<Radio name="sex" value={2}>Женский</Radio>
						</FormItem>

						<FormItem top="Школа">
							<SelectMimicry placeholder="Выбрать школу" disabled />
						</FormItem>
						<FormItem top="Университет">
							<SelectMimicry placeholder="Выбрать университет" disabled />
						</FormItem>

						<FormItem top="Дополнительно">
							<Checkbox>С фотографией</Checkbox>
							<Checkbox>Сейчас на сайте</Checkbox>
						</FormItem>

						<FormItem top="Работа">
							<Input placeholder="Место работы" />
						</FormItem>
						<FormItem>
							<Input placeholder="Должность" />
						</FormItem>

						<FormItem top="Дата рождения">
							<DatePicker
								min={{ day: 1, month: 1, year: 1901 }}
								max={{ day: 1, month: 1, year: 2006 }}
								dayPlaceholder="Д"
								monthPlaceholder="ММ"
								yearPlaceholder="ГГ"
							/>
						</FormItem>
					</Group>
				</ModalPage>
			</ModalRoot>
		);

		const isDesktop = viewWidth >= ViewWidth.TABLET;

		return (
			<SplitLayout
				style={{ justifyContent: "center" }}
				header={<PanelHeader separator={false} />}
				popout={popout}
				modal={modalRoot}
			>
				{isDesktop && (
					<SplitCol fixed width="280px" maxWidth="280px">
						<Panel>
							<PanelHeader />
							{panels.map((i) => (
								<Cell
									key={i}
									disabled={i === panel}
									style={
										i === panel
											? {
												backgroundColor: "var(--button_secondary_background)",
												borderRadius: 8,
											}
											: {}
									}
									onClick={() => setPanel(i)}
								>
									{i}
								</Cell>
							))}
							<Separator />
							<Cell onClick={() => setModal(modals[0])}>modal 1</Cell>
							<Cell onClick={() => setModal(modals[1])}>modal 2</Cell>
							<Cell onClick={showAlert}>Alert</Cell>
							<Cell onClick={showSnackbar}>Snackbar</Cell>
						</Panel>
					</SplitCol>
				)}

				<SplitCol
					animate={!isDesktop}
					spaced={isDesktop}
					popout={popout}
					width={isDesktop ? "560px" : "100%"}
					maxWidth={isDesktop ? "560px" : "100%"}
				>
					<View activePanel={panel}>
						<Panel id={panels[0]}>
							<PanelHeader right={<Avatar size={36} />}>Panel 1</PanelHeader>
							<Group>
								<Group mode="plain">
									<SimpleCell indicator="+7 ••• •• •• 96" before={<Icon28PhoneOutline />}>
										Номер телефона
         						 	</SimpleCell>
									<SimpleCell indicator="g•••@gmail.com" before={<Icon28MailOutline />}>
										Email
          							</SimpleCell>
								</Group>
								<Group mode="plain">
									<SimpleCell indicator="Обновлён 3 года назад" before={<Icon28KeyOutline />}>
										Пароль
          							</SimpleCell>
									<SimpleCell indicator="Вкл." before={<Icon28CheckShieldDeviceOutline />}>
										Подтверждение входа
          							</SimpleCell>
									<SimpleCell indicator="2" before={<Icon28DevicesOutline />}>
										Привязанные устройства
          							</SimpleCell>
								</Group>
							</Group>

							<Group
								header={<Header>Последняя активность</Header>}
							>
								<SimpleCell
									after={<IconButton icon={<Icon16MoreVertical />} />}
									description="Санкт-Петербург, Россия"
									before={<Avatar size={32} mode="app" />}
								>
									VK · Приложение для iPhone
        						</SimpleCell>
								<SimpleCell
									after={<IconButton icon={<Icon16MoreVertical />} />}
									description="Санкт-Петербург, Россия"
									before={<Avatar size={32} mode="app" />}
								>
									VK · Браузер Chrome для macOS
        						</SimpleCell>
								<CellButton onClick={showSnackbar}>Показать историю активности</CellButton>
								<CellButton mode="danger" onClick={showAlert}>Завершить все остальные сеансы</CellButton>
							</Group>

							<Group
								header={<Header>Адреса</Header>}
								description="Для использования в мини-приложениях, Delivery Cub, VK Taxi и других сервисах ВКонтакте. Эти адреса видны только Вам."
							>
								<CellButton>Добавить домашний адрес</CellButton>
								<CellButton>Добавить рабочий адрес</CellButton>
							</Group>
							{snackbar}
						</Panel>

						<Panel id={panels[1]}>
							<PanelHeader right={<Avatar size={36} />}>Panel 2</PanelHeader>
							<Group>
								<Placeholder>Доступ запрещён</Placeholder>
								<Separator />
								<Placeholder
									header="Находите друзей"
									action={<Button size="m">Найти друзей</Button>}
								>
									Здесь будут отображаться люди, которых вы добавите в друзья
                				</Placeholder>
							</Group>
						</Panel>

						<Panel id={panels[2]}>
							<PanelHeader right={<Avatar size={36} />}>Panel 3</PanelHeader>
							<Group>
								<Placeholder
									icon={<Icon56MessageReadOutline />}
									action={
										<Button size="m" mode="tertiary">
											Показать все сообщения
                    					</Button>
									}
								>
									Нет непрочитанных
                  					<br />
                  					сообщений
                				</Placeholder>
							</Group>
						</Panel>
					</View>
				</SplitCol>
			</SplitLayout>
		);
	},
	{
		viewWidth: true,
	}
);
export default App;